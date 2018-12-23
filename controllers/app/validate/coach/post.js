const Coach = require('../../../../models/coach/Coach');
const User = require('../../../../models/user/User');
const validator = require('validator');
const sendMail = require('../../../../utils/sendMail');

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.password && req.body.confirmPassword && req.body.email) {
    if (req.body.password === req.body.confirmPassword) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) { 

          Coach
            .findOne({email: req.session.coach.email})
            .then((coach) => {
              if (!coach) return res.redirect('/');

              Coach
                .findOne({email: req.body.email})
                .then((coachTry) => {
                  User
                    .findOne({email: req.body.email})
                    .then((userTry) => {
                      if (!userTry && !coachTry) {
          
                        coach.name = req.body.name;
                        coach.email = req.body.email;
                        coach.date = req.body.date;
                        coach.phoneNumber = req.body.phone || undefined;
                        coach.password  = req.body.password;
                        coach.completed = true;
          
                        coach.save((err, coach) => {
                            if (err) return res.redirect('/');
                            if (!coach) return res.redirect('/');
          
                            sendMail({
                              email: coach.email,
                            }, 'coachRegister', (err, info) => {
                              if (err) return console.log(err);
                              return res.redirect('/auth/coach/login');
                            });
                          });
                      } else {
                        res.redirect('/app/coach/validate/?err=5')
                      }
                    });
                });
            });
        } else {
          return res.redirect('/app/coach/validate/?err=4');
        } 
      } else {
        return res.redirect('/app/coach/validate/?err=3');
      }  
    } else {
      return res.redirect('/app/coach/validate/?err=2');
    }
  } else {
    return res.redirect('/app/coach/validate/?err=1');
  }
}
