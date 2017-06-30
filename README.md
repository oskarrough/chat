# Chat

A little web chat with zero persistence.

## Deployment

You can deploy the chat using [now.sh](https://zeit.co/now):

- `now oskarrough/chat`

... or you can deploy to Heroku:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/oskarrough/chat)

In any case, insert the URL you get into this snippet and paste it where you want the chat to appear.

```markup
<div class="RoughChat" url="">
<script src="https://unpkg.com/socket.io-client@2.0.3/dist/socket.io.slim.js"></script>
<script src="https://unpkg.com/vue@2.3.3/dist/vue.min.js"></script>
<script src="https://rawgit.com/oskarrough/chat/master/public/client.js"></script>
```

Chat away!

> Note, the `.RoughChat` element needs to come before the `client.js` script.

## Development

- `git clone git@github.com:oskarrough/chat.git`
- `cd chat`
- `yarn`
- `yarn start`

You can run `yarn format` to automatically format all scripts.

