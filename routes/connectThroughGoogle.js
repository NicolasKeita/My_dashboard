const express = require('express');
const router = express.Router();
const {OAuth2Client} = require('google-auth-library');
const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');

// Download your OAuth2 configuration from the Google
const keys = require('../google_api_key_oauth2');

router.get('/', async function(req, res, next) {
    req.session.oAuth2Client = await getAuthenticatedClient();
    req.session.is_connected = true;

    console.log("ICI OAUTH", req.session.oAuth2Client, "\n\n"); // TODO remove

   // API call to fetch the username
    const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
    const res2 = await req.session.oAuth2Client.request({url});

    req.session.user_email_connected = res2.data.names[0].displayName;

    await res.redirect('dashboard');
});

router.post('/', async function(req, res, next) {
    console.log("POST GOOGLE REQUEST");
});


/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
function getAuthenticatedClient() {
    return new Promise((resolve, reject) => {
        // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
        // which should be downloaded from the Google Developers Console.
        const oAuth2Client = new OAuth2Client(
            keys.web.client_id,
            keys.web.client_secret,
            keys.web.redirect_uris[0]
        );

        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
        });

        // Open an http www to accept the oauth callback. In this simple example, the
        // only request to our webserver is to /oauth2callback?code=<code>
        const server = http
            .createServer(async (req, res) => {
                try {
                    if (req.url.indexOf('google_auth_redirect_after_login') > -1) {
                        // acquire the code from the querystring, and close the web www.
                        const qs = new url.URL(req.url, 'http://localhost:3000')
                            .searchParams;
                        const code = qs.get('code');
                        console.log(`Code is ${code}`);
                        res.end('Authentication successful! You can close this window.');
                        server.destroy();

                        // Now that we have the code, use that to acquire tokens.
                        const r = await oAuth2Client.getToken(code);
                        // Make sure to set the credentials on the OAuth2 client.
                        oAuth2Client.setCredentials(r.tokens);
                        console.info('Tokens acquired.');
                        resolve(oAuth2Client);
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
