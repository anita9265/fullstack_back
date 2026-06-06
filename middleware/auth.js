const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.json({
            message: "Token Required"
        });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN =>", token);

    try {

        const decoded = jwt.verify(
            token,
             process.env.SECRET_KEY
        );

        req.user = decoded;
        next();

    } catch (err) {
        console.log(err);
        console.log(err.message);

        return res.json({
            message: "Invalid Token",
            error: err.message
        });
    }
};
module.exports = verifyToken;