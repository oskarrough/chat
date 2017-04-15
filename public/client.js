/* global io, Vue */

var chat = new Vue({
	el: '#chat',
	data: function () {
		return {
			users: 0,
			message: '',
			messages: [],
			isScrolledToBottom: true
		}
	},
	mounted: function () {
		// Set up the socket connection with dynamic host.
		var host = ''
		var attrs  = this.$el.attributes
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
	computed: {
		isScrolledToBottom: function () {
		}
	},
	methods: {
		sendMessage() {
			var msg = this.$data.message
			this.socket.emit('chat message', msg)
			this.$data.messages.push({text: msg})
			this.$data.message = ''
			// setTimeout(this.checkScroll, 1000)
			this.timer = setInterval(() => {
				this.checkScroll()
				if (this.isScrolledToBottom) {
					this.scrollToBottom()
				}
			}, 1000)
		},
		checkScroll() {
			var $ = (selector) => this.$el.querySelector(selector)
			let el = $('.Chat-bottom')
			var container = $('ol')
			this.isScrolledToBottom = Boolean(inViewport(el, {container}))
		},
		scrollToBottom() {
			var list = this.$el.querySelector('ol')
			console.log(list)
			list.scrollTop = list.scrollHeight;
			// console.log('scrolling to bottom')
		}
	},
	beforeDestroy() {
		clearInterval(this.timer)
	}
})

