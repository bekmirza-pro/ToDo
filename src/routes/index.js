const Router = require('express')
const router = new Router()
const categoryRouter = require('./categoryRouter')
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/task', taskRouter)


module.exports = router