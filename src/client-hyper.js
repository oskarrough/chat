const {neverland: neverlandComponent, useState, useEffect, wire, html} = window.neverland

const Chat2 = {
	init(event) {
		this.el = event.currentTarget
		this._rando = Math.random()
		this.render()
	},

	render() {
		window.hyperHTML.bind(this.el)`<p>yolo ${this._rando}</p>`
	}
}

const Chat = neverlandComponent(props => {
	const [username, setUsername] = useState('')
	const [userCount, setUserCount] = useState(0)
	const [messages, setMessages] = useState([])

	const socket = props.socket

	// Listen to socket events.
	// WARNING: This is not the place to set up events. 
	socket.on('chat message', message => {
		console.log(message)
		setMessages(messages.concat([message]))
	})
	socket.on('update users', count => {
		console.log({count})
		// creates an infinite loop
		setUserCount(count)
	})

	function submitUsername(event) {
		event.preventDefault()
		setUsername(event.target.username.value)
		focusCurrentInput()
	}

	function changeUsername(event) {
		event.preventDefault()
		setUsername('')
		focusCurrentInput()
	}

	function focusCurrentInput() {
		var el = props.el.querySelector('input')
		el.focus()
		el.select()
	}

	function submitMessage(event) {
		event.preventDefault()
		const content = event.target.message.value
		if (!content.length) return
		var message = {username, content}
		socket.emit('chat message', message)
		setMessages(messages.concat([message]))
		event.target.message.value = ''
	}

	const usernameForm = wire()`
	<form class="df" onsubmit="${submitUsername}">
		<input name="username" autofocus class="f-1" placeholder="Hi, what may we call you?" title="What is your name?" />
		<button type="submit">Continue</button>
	</form>`

	const messageForm = wire()`
	<form class="row" onsubmit="${submitMessage}">
		<button onclick="${changeUsername}" title="Tap here to change your name" class="reset-btn" type="button" >
			${username}
		</button>
		<input name="message" placeholder="Send a message" class="f-1 ml-05" autofocus autocomplete="off" />
		<button type="submit">OK</button>
	</form>`

	return html`
		${userCount > 0 ? `<p class="tr">Online: <span v-cloak>${userCount}</span></p>` : ''}

		<ol class="reset-list">
			${
				messages.map(msg => `<li>${msg.username ? msg.username : 'Anonymous'}: ${msg.content}</li>`)
			}
		</ol>
		${!username ? usernameForm : messageForm}
	`
})

const Counter = neverlandComponent(() => {
	const [count, setCount] = useState(0)
	return html`
		<button onclick="${() => setCount(count + 1)}">Neverland counter: ${count}</button>
	`
})
// document.body.appendChild(Counter())

const CounterWrapper = {
	init(event) {
		this.el = event.target
		this.state = {
			count: 0
		}
		this.render()
	},
	onclick(event) {
		console.log(event)
	},
	render() {
		this.el.appendChild(Counter())
		// const {count} = this.state
		// function setCount(value) {
		// 	console.log('setcount')
		// }
		// hyperHTML.bind(this.el)`
		// 	<button onclick="${setCount(count + 1)}">Count: ${count}</button>
		// `
	}
}

window.wickedElements.define('.Counter', CounterWrapper)
// window.wickedElements.define('.RoughChat', Chat2)
window.wickedElements.define('.RoughChat', {
	// triggered once live
	// if defined later on and already live it will trigger once (setup here)
	onconnected() {
		this.el.classList.add('fade-in')
		const url = this.el.getAttribute('url')

		// Set up the socket connection with dynamic url.
		console.log('setting up socket')
		const socket = io(url)

		this.el.appendChild(
			Chat({
				el: this.el,
				socket
			})
		)
	},
	// triggered once lost/removed
	ondisconnected() {
		console.log('goodbye')
	},
	// triggered when any attribute changes
	onattributechanged(event) {
		const {attributeName, oldValue, newValue} = event
		console.log(attributeName, oldValue, newValue)
	}
	// optionally you can specify attributes to observe
	// by default, or with an empty list, all attributes are notified
	// attributeFilter: ['only', 'these', 'attrs']
})

