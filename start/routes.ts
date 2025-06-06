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
const PostLikesController = () => import('#controllers/post_likes_controller')

const RegistersController = () => import('#controllers/registers_controller')
const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')
const FeedController = () => import('#controllers/feed_controller')

router.get('/', [FeedController, 'index'])

router.get('register', [RegistersController, 'create'])
router.post('register', [RegistersController, 'store'])

router.get('login', [AuthController, 'create'])
router.post('login', [AuthController, 'store'])

router
  .group(() => {
    router.delete('logout', [AuthController, 'destroy']).as('logout')
    router.post('posts', [PostsController, 'store']).as('posts.store')
    router.get('posts/:id/edit', [PostsController, 'edit']).as('posts.edit')
    router.patch('posts/:id', [PostsController, 'update']).as('posts.update')
    router.delete('posts/:id', [PostsController, 'destroy']).as('posts.destroy')
    router.post('posts/:id/like', [PostLikesController, 'store']).as('posts.like')
    router.delete('posts/:id/like', [PostLikesController, 'destroy']).as('posts.unlike')
  })
  .middleware(middleware.auth())
