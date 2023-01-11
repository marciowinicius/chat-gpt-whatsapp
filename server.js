const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}))

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/message', async (req, res) => {
    const response = new MessagingResponse();

    const message = req.body.Body;
    const from = req.body.From;

    response.message(`Your text to me was ${message}.
                    Webhooks are neat :)`);
    res.set('Content-Type', 'text/xml');

    if (message.length <= 12) {
        client.messages
            .create({
                from: 'whatsapp:' + process.env.TWILLIO_FROM_NUMBER,
                body: "Hello. Feel free to ask anything.\n" + "Please send a question with more than 12 characters.",
                to: 'whatsapp:' + from
            })
            .then(message => console.log(message.sid));
        res.send(response.toString());
        return;
    }

    const gptResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        temperature: 0.7,
        max_tokens: 4000,
    });

    var gptAnswer = gptResponse.data.choices[0].text.trim();

    console.log("GPT Answer: " + gptAnswer)

    client.messages
        .create({
            from: 'whatsapp:' + process.env.TWILLIO_FROM_NUMBER,
            body: "Your answer is:\n" + gptAnswer +"\n" + "Feel free to ask anything.",
            to: 'whatsapp:' + from
        })
        .then(message => console.log(message.sid));
    res.send(response.toString());
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});