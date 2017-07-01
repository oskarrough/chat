/* global io, Vue */

var template = `
<div class="RoughChat">
	<p v-if="users > 1" class="tr">Online: <span v-cloak>{{users}}</span></p>
	<ol v-cloak class="reset-list">
		<li v-for="message in messages">
			<strong v-if="message.username">{{message.username}}</strong>
			<strong v-else>Anonymous</strong>: {{message.content}}
		</li>
	</ol>
	<form class="df" v-if="!username" v-on:submit.prevent="setUsername">
		<input autofocus v-model="usernameInput" class="f-1" placeholder="Hi, what may we call you?" title="What is your name?" />
		<button type="submit">OK</button>
	</form>
	<form v-else class="row" v-on:submit.prevent="sendMessage">
		<button v-on:click="changeUsername" title="Tap here to change your name" class="reset-btn" type="button">{{username}}</button>
		<input v-model="message" placeholder="Send a message" class="f-1 ml-05" autofocus autocomplete="off" />
		<button type="submit">Chat</button>
	</form>
</div>
`

var chat = {
	name: 'rough-chat',
	template: template,
	props: {
		url: ''
	},
	data: function() {
		return {
			usernameInput: '',
			username: '',
			message: '',
			messages: [],
			users: 0
		}
	},
	mounted: function() {
		// Set up the socket connection with dynamic url.
		this.socket = io(this.$props.url)

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
		},
		setUsername() {
			this.username = this.usernameInput
		},
		changeUsername() {
			this.username = ''
			this.$nextTick(() => {
				var el = this.$el.querySelector('input')
				el.focus()
				el.select()
			})
		}
	}
}

var App = new Vue({
	el: '.RoughChat',
	render: function(createElement) {
		var attrs = this.$el.attributes
		var url = attrs.url ? attrs.url.value : ''
		return createElement(chat, {
			props: {
				url
			}
		})
	}
})
