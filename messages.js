var processMsgs = (data) => {
    console.log(`Message from ${data.contact.uid}: ${data.message.body.text}`);
};

var processAck = (data) => {
    console.log(`ack level: ${data.ack}`);
};

var processImage = (data) => {
    console.log(`Image url: ${data.message.body.url}`);
};

module.exports = {
    processMsgs,
    processImage,
    processAck
};
