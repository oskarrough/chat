var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

var port = process.env.PORT || 3000

// Serve the chat client.
app.use(express.static('public'))
app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})

var users = 0

// Docs: https://github.com/socketio/socket.io/blob/master/docs/emit.md
io.on('connect', onConnect)

function onConnect(socket) {
	users++
	io.emit('update users', users)

	socket.on('disconnect', () => {
		users--
		io.emit('update users', users)
	})

	socket.on('chat message', msg => {
		socket.broadcast.emit('chat message', msg) // send to all but the sender
	})
}

http.listen(port, () => {
	console.log('Server listening at port %d', port)
})
