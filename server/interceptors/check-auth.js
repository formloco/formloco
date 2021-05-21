/* eslint-disable */
const config = require('../config/index');
const secret = config().security;

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, secret.TK_SKT);
        req.userInfo = { userid: decodedToken.userid }
        next();
    } catch (error) {
        res.status(400).json({
            message: 'Unauthorized Access.'
        });
    }
}


