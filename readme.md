# Whatsapp Chat GPT
## Technologies
- NodeJS 18
- Express.js
- Docker / Docker-compose
- Webhook

## Requirements
- Twillio account with a whatsapp number (https://console.twilio.com/?frameUrl=/console)
- Open AI API KEY (https://beta.openai.com/account/api-keys)

## Suplementary documentation
- Whatsapp with twillio (https://www.twilio.com/docs/whatsapp)
- Integration NodeJS with twillio (https://www.twilio.com/docs/whatsapp/quickstart/node)
- Integration NodeJS with Open AI (https://beta.openai.com/docs/libraries/node-js-library)

## Features
- Twillio Integration
- Open AI integration
- Receive and send whatsapp message from twillio number
- Send response from Open AI for the question back to the number who sent the message to twillio number

## Get Started
> First step : clone this repository with `git clone https://github.com/marciowinicius/chat-gpt-whatsapp.git`

> Second step : copy .env.example to .env on the project root dir

> Third step : change the env vars on .env file that you already clone.
Explain every env var:
PORT is the port that you want docker-compose expose to your machine, by default the value is 3000
TARGET is the target of multi-stage of dockerfile. If you are on localhost you use dev. If you are on production server you use production
OPENAI_API_KEY is the API KEY that you got from https://beta.openai.com/account/api-keys
TWILLIO_FROM_NUMBER is the number that you got from https://console.twilio.com/us1/develop/phone-numbers/manage/active?frameUrl=%2Fconsole%2Fphone-numbers%2Fincoming%3Fx-target-region%3Dus1
TWILIO_ACCOUNT_SID is the account sid that you got here https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1 at the end of the page
TWILIO_AUTH_TOKEN is the account token that you got here https://console.twilio.com/?frameUrl=%2Fconsole%3Fx-target-region%3Dus1 at the end of the page

> Fourth step : run in the terminal `docker-compose up -d`

> Fifth step : Now you have to send a message to the number of the twillio that you got so for this example I got the number and you can send a message with this link on whatsapp https://api.whatsapp.com/send/?phone=16692607219&text=Hi. Just change the number on parameter phone of this link and you will send a message to the phone number that you got on twillio.
Now twillio can send a message without a message template of whatsapp. If you don't make the contact before and try to send a message, you will not receive the message, because twillio can't send messages if you don't make the first interaction with the number.

> Sixth step : Now you can you the webhook on your own machine
The webhook on your machine is

```bash
curl --location --request POST 'http://localhost:3000/message' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'To=whatsapp:+14155238886' \
--data-urlencode 'From=whatsapp:+556293163846' \
--data-urlencode 'Body=Quem é akon no mundo da música?'
```

## Deploying application
##### You can deploy the application and them config the webhook on twillio. For this you can choose any host that you want.
I chose a free NodeJS hosting here is the website : https://render.com/.

You can fork this project to your github account and use the free tier connected to github account. `Don't forget to put the env vars`

Since you deployed the app on render they will give you an URL to access your web application.

The URL will be like https://something-here.onrender.com.

And the webhook will be https://something-here.onrender.com/message
With this webhook on your hands you will access the menu to config the webhook on the sender of twillio whatsapp here https://console.twilio.com/us1/develop/sms/senders/whatsapp-senders?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Fsenders%3Fx-target-region%3Dus1
Edit your whatsapp sender webhook url to https://something-here.onrender.com/message

Now you can interact with the number of twillio without simulate the webhook on your machine.

#### If you want to play a litte bit you can send message to this number ... I don't know how many time will be up the project on onrender.com
### https://api.whatsapp.com/send/?phone=16692607219&text=Hi