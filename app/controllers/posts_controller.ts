import Post from '#models/post'
import { PostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({ request, auth, session, response }: HttpContext) {
    const payload = await request.validateUsing(PostValidator)

    await Post.create({
      userId: auth.user!.id,
      content: payload.content,
    })

    session.flash({
      notification: {
        type: 'success',
        message: 'Post created successfully.',
      },
    })

    return response.redirect('/')
  }
}
