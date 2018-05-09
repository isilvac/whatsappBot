var processMsgs = (obj) => {
    var data = JSON.parse(obj);
    console.log(`Message from ${data.contact[uid]}: ${data.message[body][text]}`);
};

var processAck = (data) => {
    var data = JSON.parse(data);
    console.log(`ack level: ${data.ack}`);
};

module.exports = {
    processMsgs,
    processAck
};
