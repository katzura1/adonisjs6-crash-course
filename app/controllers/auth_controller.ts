import User from '#models/user'
import { LoginValidator } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  create({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async store({ auth, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(LoginValidator)

    try {
      const user = await User.verifyCredentials(payload.email, payload.password)

      await auth.use('web').login(user)

      session.flash({
        notification: {
          type: 'success',
          message: 'Login successful.',
        },
      })

      return response.redirect('/')
    } catch (error) {
      session.flash({
        notification: {
          type: 'error',
          message: 'Invalid email or password.',
        },
      })

      return response.redirect().back()
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect('/')
  }
}
