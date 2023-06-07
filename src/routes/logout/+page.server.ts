import { redirect } from '@sveltejs/kit'
import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
	default: ({ cookies }) => {
		// event.cookies.set('user', false, {path: '/', httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', maxAge: 60*60*24*30 })
		cookies.delete('user')

		return { success: true }
	}
}
