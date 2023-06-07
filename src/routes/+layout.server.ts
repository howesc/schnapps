import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
	// console.log('/+layout.server.js:', await event.cookies.get('user'))
	return {
		user: cookies.get('user')
	}
}

