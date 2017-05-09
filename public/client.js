/* global io, Vue */

var chat = new Vue({
	el: '#chat',
	data: function() {
		return {
			username: 'Anonymous',
			message: '',
			messages: [],
			users: 0
		}
	},
	mounted: function() {
		// Set up the socket connection with dynamic host.
		var host = ''
		var attrs = this.$el.attributes
		if (attrs.host) {
			host = attrs.host.value
		}
		this.socket = io(host)

		// Listen to socket events.
		this.socket
			.on('chat message', message => {
				this.$data.messages.push(message)
			})
			.on('update users', users => {
				this.$data.users = users
			})
	},
	methods: {
		sendMessage() {
			var message = {
				username: this.$data.username,
				content: this.$data.message
			}
			if (!message.content.length) return
			this.socket.emit('chat message', message)
			this.$data.messages.push(message)
			this.$data.message = ''
		}
	}
})
