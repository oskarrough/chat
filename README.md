# Chat

A little web chat with zero persistence.

## How to use

**1. Deploy the chat server**

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/oskarrough/chat) [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/oskarrough/chat)

**2. Copy paste this snippet into your page**

```html
<div class="RoughChat" url="insert_your_servers_url_here">
<script src="https://unpkg.com/socket.io-client@2.0.3/dist/socket.io.slim.js"></script>
<script src="https://unpkg.com/vue@2.3.3/dist/vue.min.js"></script>
<script src="https://rawgit.com/oskarrough/chat/master/src/client.js"></script>
```

**3. That's it.** Chat away! Note, the `.RoughChat` element needs to come before the `client.js` script.

## Development

- `git clone git@github.com:oskarrough/chat.git`
- `cd chat`
- `yarn`
- `yarn start`

## Testing

- `yarn format` (formats all scripts and tests)
- `yarn test` (runs tests - requires Google Chrome for now)

