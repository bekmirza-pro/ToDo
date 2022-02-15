const { Category } = require('../models/models')
const ApiError = require('../error/ApiError');
const { verify } = require("../../lib/jwt");

class CategoryController {
    async create(req, res, next) {
        try {
            const { title } = req.body
            const { token } = req.headers;
            const { userId } = verify(token);

            const category = await Category.create({ title, userId })

            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            let { title } = req.body
            let { id } = req.params

            await Category.update({ title }, {
                where: {
                    id
                }
            })

            return res.json('Updated!')
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Category.destroy({
                where: {
                    id
                }
            })
            return res.json('Delete Category')

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            const category = await Category.findAll({
                order: [
                    ['id', 'DESC'],
                ]
            })
            return res.json(category)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new CategoryController()