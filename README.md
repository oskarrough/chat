# Chat

A little web chat with zero persistence. Uses express+socket.io and Vue.js.

## Development

- `git clone git@github.com:oskarrough/chat.git`
- `cd chat`
- `yarn install`
- `yarn start`

You can run `yarn lint` to automatically format all scripts.

## Deployment

You can deploy the chat using [now.sh](https://zeit.co/now):

- `now`

OR, if you want the chat on your own site, do this:

- Run `now` and copy the URL you get into the index.html like this:
- Copy `public/index.html` and `public/client.js` to your own site
- Edit the `index.html` file with the URL you got from running `now`:

```markup
<div id="chat" host="https://YOUR-PROJECT-ynjogsnnjn.now.sh/">
```

Chat away!
