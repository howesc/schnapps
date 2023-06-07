import type { Actions } from '@sveltejs/kit'
import { fail, redirect } from '@sveltejs/kit'

import { prisma } from '$lib//server/prisma'

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const { username, password } = Object.fromEntries(await request.formData()) as {
			username: string
			password: string
		}

		if (!username) return fail(400, { username, missingUsername: true })
		if (!password) return fail(400, { username, missingPassword: true })

		try {
			await prisma.user.create({
				data: {
					username,
					password
				}
			})

			cookies.set('user', 'true', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30
			})

			throw redirect(300, '/port')
		} catch (err) {
			console.log('/register +page.server.ts:', String(err))
			cookies.delete('user')
			return fail(500, { message: 'Register failed' })
		}
	}
}
