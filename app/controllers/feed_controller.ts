import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class FeedController {
  async index({ view, auth }: HttpContext) {
    await auth.check()
    // const user = auth.user

    const posts = await Post.query().orderBy('createdAt', 'desc').preload('user').withCount('likes')
    // .where('userId', user ? user.id : 0)

    return view.render('pages/home', {
      posts,
    })
  }
}
