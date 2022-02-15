const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')

router.post('/', taskController.create)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.delete)
router.get('/', taskController.getAll)
router.get('/:id', taskController.getCategory)

module.exports = router