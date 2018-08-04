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

module.exports.checkRole = (role) => {
    
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            next();
        } else {
            next(createError(403, 'Insufficient privileges'))
        }

    }
}


module.exports.checkPostOwner = (role, post) => {
    
    return (req, res, next) => {
        id = req.params.id;
        post.findById(id)
            .populate('user')
            .then(result => {
                if (req.isAuthenticated() && (req.user.role === role || req.user._id == result.user.id)) {
                    next();
                } else {
                    next(createError(403, 'Insufficient privileges'))
                }
            })
            .catch()

    }
}
