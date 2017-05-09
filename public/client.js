/* global io, Vue */

var chat = new Vue({
	el: '#chat',
	data: function() {
		return {
			users: 0,
			message: '',
			messages: []
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
			.on('chat message', msg => {
				this.$data.messages.push({text: msg})
			})
			.on('update users', users => {
				this.$data.users = users
			})
	},
	methods: {
		sendMessage() {
			var msg = this.$data.message
			this.socket.emit('chat message', msg)
			this.$data.messages.push({text: msg})
			this.$data.message = ''
		}
	}
})
