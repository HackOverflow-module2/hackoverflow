const passport = require('passport');
const url = require('url');



module.exports.create = (req, res, next) => {
  const url = req.query
  console.log(req.query)
  res.render('sessions/create', {
    url
  });
}

module.exports.doCreate = (req, res, next) => {
  console.log(req.body.url);

  function renderWithErrors(errors) {
    res.status(400).render('sessions/create', {
      user: req.body,
      errors: errors
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    renderWithErrors({
      email: email ? undefined : 'Email is required',
      password: password ? undefined : 'Password is required'
    });
  } else {
    passport.authenticate('local-auth', (error, user, validation) => {
      if (error) {
        next(error);
      } else if (!user) {
        renderWithErrors(validation);
      } else {
        req.login(user, (error) => {
          if (error) {
            next(error)
          } else {
            res.redirect(req.body.url)
          }
        });
      }
    })(req, res, next);
  }
}

module.exports.delete = (req, res, next)=> {
  req.logout();
  res.redirect('/sessions/create');
}