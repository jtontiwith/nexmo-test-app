require('dotenv').config();
const Nexmo = require('nexmo')
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const nexmo = new Nexmo({
    apiKey: '500a33b1',
    apiSecret: 'mh9beH7p6QeMdhmI',
    applicationId: '60c54600-8525-4aea-9342-2a4dc0ebf391',
    privateKey: './private.key'
})

let i = 0;

const handleInboundSms = (request, response) => {
    i++
    console.log('i HERE = ', i)
    const params = Object.assign(request.query, request.body);
    // Send OK status
    displaySms(params.msisdn, params.text);

    let msg;
    let num;
    if (i === 1) { //would check number here if I could, I am send and receiving from the same number
        msg = params.text + 'Please respond with Yes or No if you can join me!';
        num = "18312878250"
    } else {
        msg = params.text;
        num = "18312878250"
    }

    nexmo.message.sendSms("13024862485", num, msg, {
        type: "unicode"
    }, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

    response.status(204).send();
}

const displaySms = (msisdn, text) => {
    console.log('FROM: ' + msisdn);
    console.log('MESSAGE: ' + text);
    console.log('---');
}

const handleStatus = (req) => {
    console.log(req)
}


app
    .route('/webhooks/inbound-sms')
    .get((request, response) => handleInboundSms(request, response, i))
    .post(handleInboundSms);


app
    .route('/webhooks/message-status')
    .get(handleStatus)


app.listen('5000', () => console.log('listening...'));