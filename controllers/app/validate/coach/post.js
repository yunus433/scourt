const Coach = require('../../../../models/coach/Coach');
const validator = require('validator');

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.password && req.body.confirmPassword && req.body.email) {
    if (req.body.password === req.body.confirmPassword) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) { 

          Coach
            .findOne({email: req.session.coach.email})
            .then((coach) => {
              if (!coach) return res.redirect('/');

              if (req.file) {

                coach.name = req.body.name;
                coach.email = req.body.email;
                coach.date = req.body.date;
                coach.phoneNumber = req.body.phone || undefined;
                coach.completed = true;
                coach.password  = req.body.password;
                coach.profileFoto = req.file.filename;

                coach.save((err, coach) => {
                  if (err) return res.redirect('/');
                  if (!coach) return res.redirect('/');
                  return res.redirect('/auth/coach/login');
                });
              } else {

                coach.name = req.body.name;
                coach.email = req.body.email;
                coach.date = req.body.date;
                coach.phoneNumber = req.body.phone || undefined;
                coach.password  = req.body.password;
                coach.completed = true;

                coach.save((err, coach) => {
                  if (err) return res.redirect('/');
                  if (!coach) return res.redirect('/');
                  return res.redirect('/auth/coach/login');
                });
              };
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
