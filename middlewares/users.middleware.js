const createError = require('http-errors');

module.exports.isOwner = (req, res, next) => {

    if (req.user._id == req.params.id) {
        next();
    } else {
        res.status(403)
            .render('error');
    }
}