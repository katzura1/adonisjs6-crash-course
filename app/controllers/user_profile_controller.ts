import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserProfileController {
  async index({ params, view, response }: HttpContext) {
    // Extract username from params
    const { username } = params

    const user = await User.query()
      .where('username', username)
      .preload('posts', (query) => {
        query.preload('user').withCount('likes')
      })
      .withCount('posts')
      .withCount('likes')
      .first()
    if (!user) {
      return response.redirect().back()
    }

    // Render the user profile view with the username
    return view.render('pages/profile', {
      user,
    })
  }
}
