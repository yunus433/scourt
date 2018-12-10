const Coach = require('../../../../models/coach/Coach');

module.exports = (req, res, next) => {
  if (req.body && req.body.id && req.body.password) {
      Coach.findCoach(req.body.id, req.body.password, (err, coach) => {
        if (err) return res.redirect('/login/?err=2');

        req.session.coach = coach;
        return res.redirect('/coachDashboard');
        // if (coach.completed) {
        //   return res.redirect('/coachDashboard');
        // } else {
        //   return res.redirect('/coachValidate');
        // }
      })
  } else {
    return res.redirect('/coachlogin/?err=1');
  }
}
