const sequelize = require('../../lib/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.TEXT, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: false },
})

const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, }
})

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, },
    content: { type: DataTypes.STRING, unique: true, }
})

User.hasMany(Category, { onDelete: 'CASCADE' })
Category.belongsTo(User)

User.hasMany(Task, { onDelete: 'CASCADE' })
Task.belongsTo(User)

Category.hasMany(Task, { onDelete: 'CASCADE' })
Task.belongsTo(Category)

module.exports = {
    User,
    Category,
    Task
}