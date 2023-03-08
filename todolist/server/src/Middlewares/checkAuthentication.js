const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports.checkAuthentication = (req, res, next) => {

    if (req.cookies.authToken) {
        jwt.verify(req.cookies.authToken, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send('You are not authorized to access this resource');
                return;
            }
         req.body.username = decoded.username;

         if (req.query) {
            req.query.username = decoded.username;}
        next();
        return;
        });
    } else {
        res.status(403).send('You have to be logged in to access this resource');
        return;
    }
};