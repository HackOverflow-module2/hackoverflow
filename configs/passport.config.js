const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

require('dotenv');


module.exports.setup = (passport) => {

  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => {
        next(null, user);
      })
      .catch(error => next(error));
  });

  passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          return user.checkPassword(password)
            .then(match => {
              if (match) {
                next(null, user);
              } else {
                next(null, null, { password: 'Invalid email or password' })
              }
            });
        } else {
          next(null, null, { password: 'Invalid email or password' })
        }
      })
      .catch(error => next(error));
  }));


  passport.use('github-auth', new GitHubStrategy({
    clientID: '6f984e8f9ad9f8dcd50b',
    clientSecret: '6d5f547818d4437cea03626b195c28c45a120a7a',
    callbackURL: 'http://localhost:3000/sessions/github/cb',
    scope: 'user:email'
    }, authenticateOAuthUser));


  function authenticateOAuthUser(accessToken, refreshToken, profile, next) {
    let socialId = `${profile.provider}Id`;
    User.findOne({ [`social.${socialId}`]: profile.id })
      .then(user => {
        if (user) {
          next(null, user);
        } else {
          console.log(profile)
          user = new User({
            name: profile.username,
            email: profile.emails[0].value,
            password: Math.random().toString(36).substring(7),
            social: {
              [socialId]: profile.id
            }
          })
          return user.save()
            .then(user => {
              next(null, user);
            });
        }
      })
      .catch(error => next(error));
  }
}


