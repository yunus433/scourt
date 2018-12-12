const Coach = require('../../../../models/coach/Coach');

module.exports = (req, res, next) => {
  if (req.body && req.body.id && req.body.password) {
      Coach.findCoach(req.body.id, req.body.password, (err, coach) => {
        if (err) return res.redirect('/auth/coach/login/?err=2');

        if (!coach) {
          return res.redirect('/auth/coach/login/?err=2');
        }
        console.log(coach);
        
        req.session.coach = coach;
        
        if (coach.completed) {
          return res.redirect('/app/coach/dashboard');
        } else {
          return res.redirect('/app/coach/validate');
        }
      })
  } else {
    return res.redirect('/auth/coach/login/?err=1');
  }
}
