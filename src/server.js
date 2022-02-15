require('dotenv').config()
const express = require('express')
const sequelize = require('../lib/db')
const models = require('./models/models')
const app = express()
const cors = require('cors')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const PORT = process.env.PORT || 8000

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()