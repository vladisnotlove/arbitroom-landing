import { defineConfig } from 'astro/config'
// @ts-ignore
import htmlBeautifier from './astro-html-beautifier'
import absoluteToRelative from './astro-absolute-to-relative'
import path from 'path'

const OTHER_ROOT = '_layout-assets'
const CSS_ROOT = '_layout-assets/css'
const JS_ROOT = '_layout-assets/js'

export default defineConfig({
	vite: {
		build: {
			rollupOptions: {
				output: {
					assetFileNames: (info) => {
						if (!info.name) return ''
						if (info.name.endsWith('.css'))
							return path.join(CSS_ROOT, info.name)
						return path.join(OTHER_ROOT, info.name)
					},
					entryFileNames: path.join(JS_ROOT, '[name].js'),
					chunkFileNames: path.join(JS_ROOT, '[name].js'),
				},
			},
		},
	},
	integrations: [htmlBeautifier(), absoluteToRelative()],
})
