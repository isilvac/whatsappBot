'use strict';
require('dotenv').config();

//import modules
const express = require('express');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');

//import internal modules
const whatsapp = require('./api/whatsapp_api');
const messages = require('./messages');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true,
    type: 'application/x-www-form-urlencoded'
}));

var date = new Date();

/* var port = process.env.HTTPS_PORT || 3000; 
var options = {
    host: process.env.HTTPS_HOST,
    servername: process.env.HTTPS_SERVERNAME,
    port: port
};

// Start listening
app.listen(
    port,
    () => { console.log(`${date.toISOString()} - Server started at ${port}`) }
);
 */
var port = process.env.HTTPS_PORT || 3000;
var options = {
    host: process.env.HTTPS_HOST,
    servername: process.env.HTTPS_SERVERNAME,
    port: port,
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT),
    ca: fs.readFileSync(process.env.HTTPS_CA)
};

// Start listening
https.createServer(options, app).listen(
    port,
    () => { console.log(`${date.toISOString()} - Server started at ${port}`) }
);

app.post('/wh', function (req, res) {
    const data = req.body;
    console.log(data);

    if (data.event === 'message') {
        console.log('Message received');
        if(data.type === 'chat') {
            messages.processMsgs(data);
        } else if (data.type === 'image') {
            messages.processImage(data);
        } else { // video, audio, document, vcard, location
            messages.processImage(data);
        }
    } else if (data.event === 'ack') {
        console.log('Notification received');
        messages.processAck(data);
    } else {
        console.log('Invalid Event', JSON.stringify(data));
        res.sendStatus(400); // Not a valid message for Webhook
    }
});

app.get('/wh', (req, res) => {
    var date = new Date();
    console.error(`${date.toISOString()} - GET attempt from ${req.hostname}`);
    res.sendStatus(403);
});

var number = XXXXXX;
whatsapp.sendText(number, 'hola, soy un bot', (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        var url = 'https://puzzledpagan.files.wordpress.com/2016/11/037.jpg?w=569&h=427'
        whatsapp.sendImage(number, url, 'tiaxabot', 'este es el estado actual del bot, pero bueno, por algo se parte', (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log('Image sent');
            }
        });
    }
});
