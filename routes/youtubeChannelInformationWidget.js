const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

const keys = require('../google_api_key_oauth2');

router.post('/', async function(req, res)
{
    const oAuth2Client = new google.auth.OAuth2(
        keys.web.client_id,
        keys.web.client_secret,
        keys.web.redirect_uris[0]
    );
    oAuth2Client.setCredentials(req.session.GoogleOAuth2Tokens);

    let service = google.youtube('v3');

    let channelViewCount = "Not Found";
    let channelSubscriberCount = "Not Found";
    let channelVideoCount = "Not Found";

    await new Promise((resolve) => {
        service.channels.list({
            auth: oAuth2Client,
            part: 'snippet,contentDetails,statistics',
            forUsername: req.body.searchText
        }, function (err, response) {
            if (err) {
                console.error('The API returned an error: ' + err);
                return;
            }
            let channels = response.data.items;
            if (channels.length !== 0) {
                channelViewCount = channels[0].statistics.viewCount;
                channelSubscriberCount = channels[0].statistics.subscriberCount;
                channelVideoCount = channels[0].statistics.videoCount;
                console.log("channelView " + channelViewCount);
            }
            resolve();
        });
    });

    res.render('dashboard', {
        user_mail: req.session.user_email_connected,
        channelViewCount : channelViewCount,
        channelSubscriberCount : channelSubscriberCount,
        channelVideoCount : channelVideoCount
    });
});

router.get('/', function(req, res) {
    if (req.session.is_connected) {
        res.render('dashboard', {
            user_mail: req.session.user_email_connected
        });
    } else {
        res.redirect('connection');
    }
});

module.exports = router;
