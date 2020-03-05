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
    console.log("GET GOOGLE REQUEST");
    if (!req.session.oAuth2Client) {
        console.log("FETCHING ONE");
        req.session.oAuth2Client = await getAuthenticatedClient();
        console.log("Done with the FECHTIRREONE");
    }
    console.log("");
    const oAuth2Client = req.session.oAuth2Client;
    const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
    const res2 = await oAuth2Client.request({url});
    console.log(res2.data);

    // After acquiring an access_token, you may want to check on the audience, expiration,
    // or original scopes requested.  You can do that with the `getTokenInfo` method.
    const tokenInfo = await oAuth2Client.getTokenInfo(
        oAuth2Client.credentials.access_token
    );
    console.log(tokenInfo);
    console.log("ICI oauth2");
    console.log(oAuth2Client);

//    await res.redirect('dashboard');
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

        console.log("Ultra async 1");
        // Generate the url that will be used for the consent dialog.
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'online',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
        });
        console.log("Ultra async 2");

        // Open an http server to accept the oauth callback. In this simple example, the
        // only request to our webserver is to /oauth2callback?code=<code>
        const server = http
            .createServer(async (req, res) => {
                try {
                    console.log("Trying to do stuff idk ..");
                    if (req.url.indexOf('connect_through_google') > -1) {
                        // acquire the code from the querystring, and close the web server.
                        const qs = new url.URL(req.url, 'http://localhost:3000')
                            .searchParams;
                        const code = qs.get('code');
                        console.log(`Code is ${code}`);
                        res.end('Authentication successful! Please return to the console.');
                        server.destroy();

                        // Now that we have the code, use that to acquire tokens.
                        const r = await oAuth2Client.getToken(code);
                        // Make sure to set the credentials on the OAuth2 client.
                        oAuth2Client.setCredentials(r.tokens);
                        console.info('Tokens acquired.');
                        resolve(oAuth2Client);
                    } else {
                        console.log("ERRR INCONUNUNU");
                    }
                } catch (e) {
                    console.log("REJECT !");
                    reject(e);
                }
            })
            .listen(3000, () => {
                console.log("Ultra async 3 LISTENING");
                // open the browser to the authorize url to start the workflow
                open(authorizeUrl, {wait: true}).then(cp => cp.unref());
            });
        destroyer(server);
    });
}

module.exports = router;
