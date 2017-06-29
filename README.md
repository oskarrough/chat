# Chat

A little web chat with zero persistence.

## Deployment

You can deploy the chat using [now.sh](https://zeit.co/now):

- `now oskarrough/chat`

... or you can deploy to Heroku:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/oskarrough/chat)

OR, if you want the chat on your own site, do this:

- Run `now` and copy the URL you get into the index.html like this:
- Copy `public/index.html` and `public/client.js` to your own site
- Edit the `index.html` file with the URL you got from running `now`:

```markup
<div id="chat" host="https://YOUR-PROJECT-ynjogsnnjn.now.sh/">
```

Chat away!

## Development

- `git clone git@github.com:oskarrough/chat.git`
- `cd chat`
- `yarn`
- `yarn start`

You can run `yarn format` to automatically format all scripts.

