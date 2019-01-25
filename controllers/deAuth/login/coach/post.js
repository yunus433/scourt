const User = require('../../../../models/user/User');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.body && req.body.email && req.body.password) {
      User.findUser(req.body.email, req.body.password, "coach", (err, coach) => {
        if (err) return res.redirect('/deAuth/login/coach/?err=2');

        if (!coach) {
          return res.redirect('/deAuth/login/coach/?err=2');
        }
        req.session.user = coach;
        return res.redirect('/de/dashboard');
      });
  } else {
    return res.redirect('/deAuth/login/coach/?err=1');
  }
}
