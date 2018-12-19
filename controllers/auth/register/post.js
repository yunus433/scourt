const User = require('../../../models/user/User');
const validator = require('validator');
const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (req.body && req.body.email && req.body.password && req.body.confirmpassword) {
    if (req.body.password === req.body.confirmpassword) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) {
          let newUserData = {
            email: req.body.email,
            password: req.body.password
          } 
    
          const newUser = new User(newUserData);
    
          newUser.save((err, user) => {
            if (err && err.code == 11000) {
              return res.redirect('/auth/register/?err=5');
            } else {
              if (err) return console.log(err.code);

              sendMail({
                email: user.email,
              }, 'userRegister', (err, info) => {
                if (err) return console.log(err);
                res.redirect('/app/validate');
              });

              req.session.user = user;
              return res.redirect('/app/validate');
            }
          });
        } else {
          return res.redirect('/auth/register/?err=4');
        }
      } else {
        return res.redirect('/auth/register/?err=3');
      }
    } else {
      return res.redirect('/auth/register/?err=2');
    }
  } else {
    return res.redirect('/auth/register/?err=1');
  }
}
