describe('<RoughChat> component', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000')
	})

	it('can set username and post a message', function () {
		let input = '.RoughChat input'
		let btn = '.RoughChat [type="submit"]'

		// Set username
		cy.get(input).type('Donald Byrd')
		cy.get(btn).click()
		cy.get('.reset-btn').should('contain', 'Donald Byrd')

		// Send two messages
		cy.get(input).type('it grooves')
		cy.get(btn).click()
		cy.get(input).type('yes it does')
		cy.get(btn).click()

		cy.get('.RoughChat').find('li').should('have.length', 2)
		cy.get('.RoughChat').find('li').first().should('contain', 'Donald Byrd: it grooves')
		cy.get('.RoughChat').find('li').last().should('contain', 'Donald Byrd: yes it does')
	})
})

