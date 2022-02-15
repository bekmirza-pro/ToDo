const { verify } = require("../../lib/jwt");

module.exports = {
    AUTH_ADMIN: (req, res, next) => {
        try {
            const { token } = req.headers;
            const { userId, role } = verify(token);

            if (!JSON.parse(role))
                return res
                    .status(401)
                    .json({ message: "Login or Register!" });

            req.body.userId = userId;
            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Login or Register!" });
        }
    },
    AUTH_USER: (req, res, next) => {
        try {
            const { token } = req.headers;
            const { userId, role } = verify(token);

            if (!role)
                return res
                    .status(401)
                    .json({ message: "Login or Register!" });

            req.body.userId = userId;

            next();
        } catch (error) {
            return res
                .status(401)
                .json({ message: "Login or Register!" });
        }
    },
};