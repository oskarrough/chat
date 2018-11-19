module.exports = {
	env: {
		browser: true,
		es6: true
	},
	parserOptions: {
		ecmaVersion: 2016
	},
	// Use default rules + prettier rules.
	extends: ['eslint:recommended', 'plugin:prettier/recommended'],
	// Throw errors when code doesn't conform to Prettier config.
	// Why is this needed when I already extend the prettier plugin?
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error'
	}
}
