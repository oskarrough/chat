/* global io, Vue */

var template = `
<div class="RoughChat">
	<p>Online: <span v-cloak>{{users}}</span></p>
	<ol v-cloak>
		<li v-for="message in messages">
			<span v-if="message.username">{{message.username}}</span>
			<span v-else>Anonymous</span>: {{message.content}}
		</li>
	</ol>
	<form v-on:submit.prevent="sendMessage">
		<input class="username" title="What is your name?" 
			v-model="username"
			placeholder="Your nickname" />
		<input v-model="message" placeholder="Send a message" class="message" autocomplete="off" />
		<button>Chat</button>
	</form>
</div>
`

var chat = new Vue({
	el: '#chat',
	template: template,
	data: function() {
		return {
			username: '',
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
			if (!this.$data.message.length) return
			var message = {
				username: this.$data.username,
				content: this.$data.message
			}
			this.socket.emit('chat message', message)
			this.$data.messages.push(message)
			this.$data.message = ''
		}
	}
})
