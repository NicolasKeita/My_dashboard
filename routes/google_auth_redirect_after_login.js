const express = require('express');
const router = express.Router();
const url = require('url');
const { google } = require('googleapis');
const keys = require('../google_api_key_oauth2');

router.get('/', async function(req, res)
{
    const qs = new url.URL(req.url, 'http://my-area-server2:8080')
        .searchParams;
    const code = qs.get('code');

    const oAuth2Client = new google.auth.OAuth2(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[0]
    );
    const r = await oAuth2Client.getToken(code);
    req.session.GoogleOAuth2Tokens = r.tokens;
    oAuth2Client.setCredentials(r.tokens);


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



    res.redirect("dashboard");
});

router.post('/', function(req, res) {
  res.end('This is a POST');
});

module.exports = router;