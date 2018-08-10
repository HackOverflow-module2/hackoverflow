const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const constants = require('../constants')
const SALT_WORK_FACTOR = 10;
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: 'Name is required'
    },
    surname: {
      type: String,
      //required: 'Surname is required'
    },
    nickname: {
      type: String,
      unique: true,
      required: 'Please enter a nickname'
    },
    photoPath: {
      type: String,
      default: "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Sad-Profile-Pic-for-Whatsapp.png"
    },
    description: {
      type: String
    },
    tags: [{
      type: String
    }],
    role: {
      type: String,
      enum: [constants.ROLE_ADMIN, constants.ROLE_GUEST],
      default: constants.ROLE_GUEST
    },
    email: {
      type: String,
      required: 'Email is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      unique: true
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    social: {
      githubId: String
    }
  }, { timestamps: true });
  
  userSchema.pre('save', function(next) {

    if (this.email === FIRST_ADMIN_EMAIL) {
      this.role = constants.ROLE_ADMIN;
    }

    if (this.isModified('password')) {
      bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
          return bcrypt.hash(this.password, salt)
        })
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch(error => next(error));
    } else {
      next();
    }
  });
  
  userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
  }
  
  const User = mongoose.model('User', userSchema);
  module.exports = User;
  