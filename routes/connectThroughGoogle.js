const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');

// Download your OAuth2 configuration from the Google
const keys = require('../google_api_key_oauth2');

router.get('/', async function(req, res)
{
    const oAuth2Client = new google.auth.OAuth2(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[0]
    );

    const tokens = await getAuthenticatedClient(oAuth2Client);
    oAuth2Client.setCredentials(tokens);
    req.session.GoogleOAuth2Tokens = tokens;

    let servicePeopleAPI = new google.people({
        version: 'v1',
        auth: oAuth2Client
    });
    await new Promise(function(resolve) {
        servicePeopleAPI.people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses,addresses,names,metadata,phoneNumbers'
        }, (err, res) => {
            if (err) return console.error('The API returned an error: ' + err);
            const emailAddresses = res.data.emailAddresses;
            if (!emailAddresses) return console.error('connectThourghGoogle.js line28 Err unknown');
            req.session.user_email_connected = emailAddresses[0].value;
            req.session.is_connected = true;
            resolve();
        });
    });

    res.redirect('dashboard');
});

/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
function getAuthenticatedClient(oAuth2Client) {
    return new Promise((resolve, reject) => {

        const scopes = [
            // Google PEOPLE API
            'profile',
            'email',

            // Google YOUTUBE API
            'https://www.googleapis.com/auth/youtube.readonly',
            'https://www.googleapis.com/auth/youtube',
            'https://www.googleapis.com/auth/youtube.force-ssl'
        ];

        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes
        });

        // Open an http www to accept the oauth callback. In this simple example, the
        // only request to our webserver is to /oauth2callback?code=<code>
        const server = http
            .createServer(async (req, res) => {
                try {
                    if (req.url.indexOf('google_auth_redirect_after_login') > -1) {
                        const qs = new url.URL(req.url, 'http://localhost:3000')
                            .searchParams;
                        const code = qs.get('code');
                        res.end('Authentication successful! You can close this window.');
                        server.destroy();
                        const r = await oAuth2Client.getToken(code);
                        resolve(r.tokens);
                    }
                } catch (e) {
                    reject(e);
                }
            })
            .listen(3000, () => {
                // open the browser to the authorize url to start the workflow
                open(authorizeUrl, {wait: false}).then(cp => cp.unref());
            });
        destroyer(server);
    });
}

module.exports = router;
