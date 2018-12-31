const User = require('../../../../models/user/User');
const validator = require('validator');
const sendMail = require('../../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.password && req.body.confirmPassword && req.body.email) {
    if (req.body.password === req.body.confirmPassword) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) { 
        
        User.findOne({"email": req.session.user.email}, (err, coach) => {
          coach.name = req.body.name;
          coach.email = req.body.email;
          coach.date = req.body.date;
          coach.phoneNumber = req.body.phone || undefined;
          coach.password  = req.body.password;
          coach.completed = true;

          coach.save(err => {
            if (err && err.code == 11000) {
              return res.redirect('/app/validate/coach/?err=5');
            } else {
              if (err) return res.redirect('/');

              sendMail({
                email: coach.email,
              }, 'coachRegister', (err, info) => {
                if (err) return console.log(err);
                return res.redirect('/auth/login/coach');
              });
            };
          });
        });
        } else {
          return res.redirect('/app/validate/coach/?err=4');
        }; 
      } else {
        return res.redirect('/app/validate/coach/?err=3');
      };  
    } else {
      return res.redirect('/app/validate/coach/?err=2');
    };
  } else {
    return res.redirect('/app/validate/coach/?err=1');
  };
};
