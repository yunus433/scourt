const User = require('../../../models/user/User');
const validator = require('validator');
const sendMail = require('../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (req.session.user.type == 'user') {
    if (req.body && req.body.name && req.body.date) {
      User.findOneAndUpdate({"email": req.session.user.email}, {$set: {
        name: req.body.name,
        date: req.body.date,
        phone: req.body.phone || undefined,
        completed: true
      }}, {upsert: true})
      .exec(err => {
        if (err) return res.redirect('/');
        return res.redirect('/app/dashboard')
      });
    } else {
      return res.redirect('/app/validate/?err=1');
    };
  } else {
    if (req.body && req.body.name && req.body.password && req.body.confirmPassword && req.body.email) {
      if (req.body.password === req.body.confirmPassword) {
        if (validator.isEmail(req.body.email)) {
          if (req.body.password.length >= 6) { 
          
          User.findOne({"email": req.session.user.email}, (err, coach) => {
            if (err) res.redirect('/');
            coach.name = req.body.name;
            coach.email = req.body.email;
            coach.date = req.body.date;
            coach.phoneNumber = req.body.phone || undefined;
            coach.password  = req.body.password;
            coach.completed = true;
  
            coach.save(err => {
              if (err && err.code == 11000) {
                return res.redirect('/app/validate/?err=5');
              } else {
                if (err) return res.redirect('/');
  
                sendMail({
                  email: coach.email,
                }, 'coachRegister', (err, user) => {
                  if (err) return res.redirect('/');
                  req.session.user = user;

                  return res.redirect('/app/dashboard');
                });
              };
            });
          });
          } else {
            return res.redirect('/app/validate/?err=4');
          }; 
        } else {
          return res.redirect('/app/validate/?err=3');
        };  
      } else {
        return res.redirect('/app/validate/?err=2');
      };
    } else {
      return res.redirect('/app/validate/?err=1');
    };
  }
};
