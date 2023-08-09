// prettier.config.js, .prettierrc.js, prettier.config.cjs, or .prettierrc.cjs

/** @type {import("prettier").Options} */
const config = {
	trailingComma: 'all',
	tabWidth: 4,
	useTabs: true,
	semi: false,
	singleQuote: true,

	plugins: [require.resolve('prettier-plugin-astro')],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
}

module.exports = config
