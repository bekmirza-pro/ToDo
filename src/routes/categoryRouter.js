const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.post('/', categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)
router.get('/', categoryController.getAll)

module.exports = router