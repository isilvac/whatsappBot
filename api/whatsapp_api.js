const request = require('request');

var token = process.env.API_TOKEN;
var phone = process.env.MSISDN;

var sendText = (destination, message) => {
    var messageId = Date.now() + phone;
    var url2Call = `https://www.waboxapp.com/api/send/chat?token=${token}&uid=${phone}&to=${destination}&custom_uid=${messageId}&text=${message}`;

    if((typeof destination === 'number') && (typeof message === 'string')) {
        request.post({
            url: url2Call,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }, (error, response, body) => {
            if (response.statusCode === 400) {
                console.log('Error:', body);
                callback('Parameters validation error');
            } else if (response.statusCode === 403) {
                console.log('Error:', body);
                callback('Authentication error');
            } else if (response.statusCode === 200) {
                console.log('Body:', JSON.stringify(body));
                callback(undefined, body);
            }
        });
    } else {
        console.log('Error en parametros:', body);
        callback('Parameter error');
    }
};

var sendImage = (destination, url, title, description) => {
    var messageId = Date.now() + phone;
    var url2Call = `https://www.waboxapp.com/api/send/image?token=${token}&uid=${phone}&to=${destination}&custom_uid=${messageId}&url=${url}`;

    // optional parameters
    if(title) {
        url2Call = url2Call + `&caption=${title}`;
    }
    if (description) {
        url2Call = url2Call + `&description=${description}`;
    }

    if (typeof destination === 'number') {
        request.post({
            url: url2Call,
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }, (error, response, body) => {
            if (response.statusCode === 400) {
                console.log('Error:', body);
                callback('Parameters validation error');
            } else if (response.statusCode === 403) {
                console.log('Error:', body);
                callback('Authentication error');
            } else if (response.statusCode === 200) {
                console.log('Body:', JSON.stringify(body));
                callback(undefined, body);
            }
        });
    } else {
        console.log('Error en parametros:', body);
        callback('Parameter error');
    }
};

module.exports = {
    sendText,
    sendImage
};
