import Nightmare from 'nightmare'
import test from 'ava'

const server = options => {
	const nightmare = Nightmare(options)
	return nightmare.goto('http://localhost:3000')
}

test('can set username and post a message', async t => {
	const message = await server({show:true})
		.type('.RoughChat input', 'Donald Byrd')
		.click('.RoughChat button')
		.wait(100)
		.type('.RoughChat input', 'it grooves')
		.click('.RoughChat button[type="submit"]')
		.wait(100)
		.evaluate(function() {
			return document.querySelectorAll('.RoughChat ol li')[0].innerText
		})
		.end()
	t.is(message, 'Donald Byrd: it grooves')
})
