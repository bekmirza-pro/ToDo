const { User } = require("../models/models");
const { sign } = require("../../lib/jwt");
const { comparePassword } = require("../../lib/bcrypt");

class LoginController {

    async login(req, res) {
        const { username, password } = req.body;
        if (!password || !username)
            return res.status(400).json({ message: "BAD_REQUEST!" });

        const user = await User.findOne({
            where: { username },
        });
        if (!user) return res.status(400).json({ message: "BAD_REQUEST" });
        const comparedPassword = await comparePassword(
            password,
            user.dataValues.password
        );

        if (!comparedPassword)
            return res.status(400).json({ message: "BAD_REQUEST" });

        if (user.dataValues.role && user.dataValues.role != "false") {
            const token = sign({ adminId: user.dataValues.id });

            return res.json({ user, token });
        } else {
            const token = sign({ userId: user.dataValues.id });

            return res.json({ user, token });
        }
    }
}

module.exports = new LoginController();