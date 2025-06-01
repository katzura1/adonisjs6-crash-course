/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegistersController = () => import('#controllers/registers_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.get('register', [RegistersController, 'create'])
router.post('register', [RegistersController, 'store'])

router.get('login', [AuthController, 'create'])
router.post('login', [AuthController, 'store'])

router.delete('logout', [AuthController, 'destroy'])
