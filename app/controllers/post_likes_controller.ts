import Post from '#models/post'
import { HttpContext } from '@adonisjs/core/http'

export default class PostLikesController {
  async store({ auth, params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    const user = auth.user

    if (!(await user?.hasLikedPost(post.id))) {
      await user?.related('likes').attach([post.id])
    }

    return response.redirect().back()
  }

  async destroy({ auth, params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    const user = auth.user

    await user?.related('likes').detach([post.id])

    return response.redirect().back()
  }
}
