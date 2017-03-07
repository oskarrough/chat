/* global io, Vue */
var socket = io()

var chat = new Vue({
	el: '#chat',
	data: {
		users: 0,
		message: '',
		messages: []
	},
	methods: {
		sendMessage() {
			var msg = this.$data.message
			socket.emit('chat message', msg)
			this.$data.messages.push({text: msg})
			this.$data.message = ''
		}
	}
})

socket
	.on('chat message', msg => {
		chat.$data.messages.push({text: msg})
	})
	.on('update users', users => {
		chat.$data.users = users
	})

