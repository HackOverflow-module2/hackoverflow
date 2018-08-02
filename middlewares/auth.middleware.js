const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(401)
            .redirect('/sessions/create');
    }
}


module.exports.isOwner = (req, res, next) => {
    if (req.user._id == req.params.id) {
        next();
    } else {
        next(createError(403));
    }
}