const joi = require('joi');


//Endpoint for Nav bar
module.exports.Logout = (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
    })
    const {error, value} = schema.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);

    if (req.cookies.authToken) {
    res.clearCookie('authToken');
    return res.status(200).json('You have successfully logged out');
    
}
    res.status(403).json('You are not authorized to access this resource');
}
