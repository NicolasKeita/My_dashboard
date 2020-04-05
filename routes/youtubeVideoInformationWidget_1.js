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

    let youtubeVideoId = "Not Found";
    let youtubeVideoPublishedDate = "Not Found";
    let youtubeVideoTitle = "Not Found";
    let youtubeVideoChannelTitle = "Not Found";

    await new Promise((resolve) => {
        service.search.list({
            auth: oAuth2Client,
            type: 'video',
            part: 'snippet',
            q: req.body.searchText
        }, function (err, response) {
            if (err) {
                console.error('The API returned an error: ' + err);
                return;
            }
            let channels = response.data.items;
            if (channels.length !== 0) {
                youtubeVideoId = channels[0].id.videoId;
                youtubeVideoPublishedDate = channels[0].snippet.publishedAt;
                youtubeVideoTitle = channels[0].snippet.title;
                youtubeVideoChannelTitle = channels[0].snippet.channelTitle;
            }
            resolve();
        });
    });

    res.render('dashboard', {
        user_mail: req.session.user_email_connected,
        widget1: req.session.widget1,
        widget2: req.session.widget2,
        widget3: req.session.widget3,
        youtubeVideoId_1 : youtubeVideoId,
        youtubeVideoPublishedDate_1 : youtubeVideoPublishedDate,
        youtubeVideoTitle_1 : youtubeVideoTitle,
        youtubeVideoChannelTitle_1 : youtubeVideoChannelTitle
    });
});

module.exports = router;
