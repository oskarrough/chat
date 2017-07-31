import Nightmare from 'nightmare'
import test from 'ava'

const server = (options) => {
	const nightmare = Nightmare(options)
	return nightmare.goto('http://localhost:3000')
}

test('can set username and post a message', async t => {
	const result = await server()
		.type('.RoughChat input', 'Donald Byrd')
		.click('.RoughChat button')
		.wait(100)
		.type('.RoughChat input', 'it grooves')
		.click('.RoughChat button[type="submit"]')
		.evaluate(function() {
			var els = document.querySelectorAll('.RoughChat ol li')
			return els[0].innerText
		})
		.end()
	t.is(await result, 'Donald Byrd: it grooves')
})
