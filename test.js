import Nightmare from 'nightmare'
import test from 'ava'

// Set up nightmare server.
test.beforeEach(async t => {
	t.context.nightmare = Nightmare({
		// show: true,
		// openDevTools: {
		// 	mode: 'detach'
		// }
	})
	await t.context.nightmare.goto('http://localhost:3000')
})

// Close it again.
test.afterEach(async t => {
	await t.context.nightmare.end()
})

test('can set username and post a message', async t => {
	const result = await t.context.nightmare
		.type('.RoughChat input', 'Donald Byrd')
		.click('.RoughChat button')
		.type('.RoughChat input', 'it grooves')
		.click('.RoughChat button[type="submit"]')
		.type('.RoughChat input', 'yes it does')
		.click('.RoughChat button[type="submit"]')
		.evaluate(function() {
			var list = document.querySelectorAll('.RoughChat ol li')
			return {
				amount: list.length,
				msg: list[0].innerText
			}
		})
		.end()
	t.is(result.amount, 2)
	t.is(result.msg, 'Donald Byrd: it grooves')
})

