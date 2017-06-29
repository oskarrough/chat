# Chat

A little web chat with zero persistence.

## Deployment

You can deploy the chat using [now.sh](https://zeit.co/now):

- `now oskarrough/chat`

... or you can deploy to Heroku:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/oskarrough/chat)

If you want to host the chat client yourself, deploy the chat like above and copy/paste the following into your page:

```markup
<div class="RoughChat" host="insert the full url to your chat server here">
<script src="https://unpkg.com/socket.io-client@2.0.3/dist/socket.io.slim.js"></script>
<script src="https://unpkg.com/vue@2.3.3/dist/vue.min.js"></script>
<script src="https://rawgit.com/oskarrough/chat/master/public/client.js"></script>
```

Chat away! Note, currently the scripts HAVE to come after the `.RoughChat` element.

## Development

- `git clone git@github.com:oskarrough/chat.git`
- `cd chat`
- `yarn`
- `yarn start`

You can run `yarn format` to automatically format all scripts.

