const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const loginController = require('../controllers/loginController')
const { AUTH_ADMIN } = require('../middleware/checkRoleMiddleware')


router.post('/', AUTH_ADMIN, userController.create)
router.post('/login', loginController.login)
router.get('/', AUTH_ADMIN, userController.getAll)


module.exports = router