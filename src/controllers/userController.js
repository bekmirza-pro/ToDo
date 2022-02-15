const ApiError = require('../error/ApiError');
const { User } = require('../models/models')
const { hashPassword } = require("../../lib/bcrypt");
const { sign } = require("../../lib/jwt");

class UserController {
    async create(req, res, next) {
        try {
            const { username, role, password } = req.body;

            if (!username || !password)
                return res.status(400).json({ message: "BAD_REQUEST!" });

            const hashedPassword = await hashPassword(password);

            const user = await User.create({
                username,
                role,
                password: hashedPassword,
            });

            if (!user)
                return res.status(500).json({ message: "Server created error!" });

            const token = sign({ userId: user.dataValues.id, role: user.role });

            return res.json({ user, token });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const users = await User.findAll({
                order: [
                    ['id', 'DESC'],
                ]
            })
            return res.json(users)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()