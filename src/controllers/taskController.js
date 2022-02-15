const { verify } = require("../../lib/jwt");
const { Task } = require('../models/models')
const ApiError = require('../error/ApiError');


class TaskController {
    async create(req, res, next) {
        try {
            let { title, content, categoryId } = req.body
            const { token } = req.headers;
            const { userId } = verify(token);

            const task = await Task.create({ title, content, userId, categoryId });

            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let { title, content, categoryId } = req.body
            let { id } = req.params

            await Task.update({ title, content, categoryId }, {
                where: {
                    id
                }
            });

            return res.json('Updated!')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            await Task.destroy({
                where: {
                    id
                }
            })

            return res.json('Delete task!')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            const task = await Task.findAll({
                order: [
                    ['id', 'DESC'],
                ]
            })
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getCategory(req, res) {
        try {
            const { id } = req.params

            const admins = await Task.findAll({
                where: {
                    categoryId: id
                }
            })
            return res.json(admins)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new TaskController()