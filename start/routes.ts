/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const UserProfileController = () => import('#controllers/user_profile_controller')
const PostLikesController = () => import('#controllers/post_likes_controller')

const RegistersController = () => import('#controllers/registers_controller')
const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')
const FeedController = () => import('#controllers/feed_controller')

// Public routes
router
  .group(() => {
    router.get('/', [FeedController, 'index']).as('feed')
    router.get('register', [RegistersController, 'create']).as('register')
    router.post('register', [RegistersController, 'store']).as('register.store')
    router.get('login', [AuthController, 'create']).as('login')
    router.post('login', [AuthController, 'store']).as('login.store')
  })
  .as('public')

// Protected routes (require authentication)
router
  .group(() => {
    router.delete('logout', [AuthController, 'destroy']).as('logout')

    // Posts related routes
    router
      .group(() => {
        router.post('/', [PostsController, 'store']).as('store')
        router.get(':id/edit', [PostsController, 'edit']).as('edit')
        router.patch(':id', [PostsController, 'update']).as('update')
        router.delete(':id', [PostsController, 'destroy']).as('destroy')

        // Post likes routes
        router.post(':id/like', [PostLikesController, 'store']).as('like')
        router.delete(':id/like', [PostLikesController, 'destroy']).as('unlike')
      })
      .prefix('posts')
      .as('posts')

    // User profile
    router.get(':username', [UserProfileController, 'index']).as('profile')
  })
  .middleware(middleware.auth())
