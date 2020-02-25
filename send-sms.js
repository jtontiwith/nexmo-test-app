const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: '500a33b1',
    apiSecret: 'mh9beH7p6QeMdhmI',
    applicationId: '60c54600-8525-4aea-9342-2a4dc0ebf391',
    privateKey: './private.key'
})

nexmo.channel.send(
    { "type": "sms", "number": "18312878250" },
    { "type": "sms", "number": "13024862485" },
    {
        "content": {
            "type": "text",
            "text": "This is an SMS sent from the Messages API"
        }
    },
    (err, data) => { console.log(data.message_uuid); }
);
