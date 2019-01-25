const validator = require('validator');
const sendMail = require('../../../../utils/sendMail');
const User = require('../../../../models/user/User');

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = (req, res, next) => {
  if (req.body && req.body.email && req.body.password && req.body.confirmpassword) {
    if (req.body.password === req.body.confirmpassword) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) {

          let newUserData = {
            email: req.body.email,
            password: req.body.password,
            type: "user",
            color: getRandomColor()
          }; 
    
          const newUser = new User(newUserData);
    
          newUser.save((err, user) => {
            if (err && err.code == 11000) {
              return res.redirect('/deAuth/register/?err=5');
            } else {
              if (err) return res.redirect('/');

              sendMail({
                email: user.email,
              }, 'userRegister', err => {
                if (err) return res.redirect('/');
                res.redirect('/de/validate');
              });

              req.session.user = user;
              return res.redirect('/de/validate');
            };
          });

        } else {
          return res.redirect('/deAuth/register/?err=4');
        }
      } else {
        return res.redirect('/deAuth/register/?err=3');
      }
    } else {
      return res.redirect('/deAuth/register/?err=2');
    }
  } else {
    return res.redirect('/deAuth/register/?err=1');
  }
}
