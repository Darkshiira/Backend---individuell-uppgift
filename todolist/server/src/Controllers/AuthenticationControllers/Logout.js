
module.exports.Logout = (req, res) => {
    if (req.cookies.authToken) {
    res.clearCookie('authToken');
    res.status(200).json('You have successfully logged out');
}
    res.status(403).json('You are not authorized to access this resource');
}
