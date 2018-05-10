'use strict';
require('dotenv').config();

//import modules
const express = require('express');
const https = require('https');

//import internal modules
const whatsapp = require('./api/whatsapp_api');
const messages = require('./messages');

const app = express();

var port = process.env.HTTPS_PORT || 3000; 
var options = {
    host: process.env.HTTPS_HOST,
    servername: process.env.HTTPS_SERVERNAME,
    port: port,
    key: fs.readFileSync(process.env.HTTPS_KEY),
    cert: fs.readFileSync(process.env.HTTPS_CERT),
    ca: fs.readFileSync(process.env.HTTPS_CA)
};

var date = new Date();
// Start listening
https.createServer(options, app).listen(
    port,
    () => { console.log(`${date.toISOString()} - Server started at ${port}`) }
);

app.post('/wh', function (req, res) {
    const data = JSON.parse(req.body);

    if (data.event === 'message') {
        console.log('Message received');
        messages.processMsgs(data);
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
