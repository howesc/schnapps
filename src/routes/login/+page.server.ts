import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		// const data = await request.formData()

		// const username = data.get('username')
		// const password = data.get('password')

		const { username, password } = Object.fromEntries(await request.formData()) as {
			username: string
			password: string
		}

		if (!username) return fail(400, { username, missingUsername: true })
		if (!password) return fail(400, { username, missingPassword: true })

		if (username == 'chrishowes' && password == 'password') {
			console.log('cock')
			// cookies.delete('user')
			cookies.set('user', 'true', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30
			})
			// throw redirect(303, '/port')
			// try {
			// 	throw redirect(303, '/port')
			// } catch (err) {
			// 	console.log({ err })
			// }
			return { success: true }
		} else {
			cookies.delete('user')
			return fail(400, { username, incorrect: true })
		}
	}
}
