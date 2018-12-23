const Coach = require('../../../../models/coach/Coach');

module.exports = (req, res, next) => {
  Coach
    .findOne({email: req.session.coach.email})
    .exec((err, coach) => {
      if (err | !coach) return res.redirect('/');

      if (req.query.err) {
        res.render('app/coach/validate', {
          page: 'app/coach/validate',
          title: 'Verify Your Account',
          includes: {
            external: ["fontawesome", "js"]       
          },
          coach,
          err: req.query.err 
        });
      } else {
        res.render('app/coach/validate', {
          page: 'app/coach/validate',
          title: 'Verify Your Account',
          includes: {
            external: ["fontawesome", "js"]       
          },
          coach
        });
      };
    });
};
