const jwt = require('jsonwebtoken');
const config = require('../environment/index.js') // we can delete index.js because its default file

module.exports = (req, res, next) => {
    try {
        req.user = jwt.verify(req.headers.authorization, config.secret);
    } catch(e) {
        res.status(403).send();
        return;
    }
    next();
}