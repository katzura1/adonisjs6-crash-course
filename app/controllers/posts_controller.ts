// import Post from '#models/post'
import Post from '#models/post'
import { PostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({ request, auth, session, response }: HttpContext) {
    const { content } = await request.validateUsing(PostValidator)

    // await Post.create({
    //   userId: auth.user!.id,
    //   content,
    // })

    await auth.user!.related('posts').create({
      content,
    })

    session.flash({
      notification: {
        type: 'success',
        message: 'Post created successfully.',
      },
    })

    return response.redirect().back()
  }

  async edit({ view, params }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    return view.render('pages/posts/edit', {
      post,
    })
  }

  async update({ request, params, session, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    const { content } = await PostValidator.validate(request.all())

    await post
      .merge({
        content,
      })
      .save()

    session.flash({
      notification: {
        type: 'success',
        message: 'Post updated successfully.',
      },
    })

    return response.redirect('/')
  }

  async destroy({ params, session, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    await post.delete()

    session.flash({
      notification: {
        type: 'success',
        message: 'Post deleted successfully.',
      },
    })

    return response.redirect('/')
  }
}
