const Coach = require('../../../../models/coach/Coach');
const validator = require('validator');

module.exports = (req, res, next) => {
  if (req.body && req.body.name && req.body.password && req.body.confirmPassword && req.body.email) {
    if (req.body.password === req.body.confirmPassword) {
      if (validator.isEmail(req.body.email)) {
        if (req.body.password.length >= 6) { 
          Coach.findCoach(req.session.coach.coachId, req.session.coach.password, (err, coach) => {
            if (err) return res.redirect('/auth/login');
      
            if (req.file) {
              Coach.findOneAndUpdate({"coachId": req.session.coach.coachId}, {$set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phone || undefined,
                completed: true,
                profileFoto: req.file.filename
              }}, {upsert: true})
              .exec((err) => {
                if (err) return console.log(err);
                res.redirect('/app/coach/dashboard')
              });
            } else {
              Coach.findOneAndUpdate({"coachId": req.session.coach.coachId}, {$set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phone || undefined,
                completed: true
              }}, {upsert: true})
              .exec((err) => {
                if (err) return console.log(err);
                res.redirect('/app/coach/dashboard')
              });
            }
      
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
