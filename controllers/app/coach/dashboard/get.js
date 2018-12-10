const Coach = require('../../../../models/coach/Coach');

module.exports = (req, res, next) => {
  if (req.session.coach) {
    Coach
      .findOne({coachId: req.session.coach.coachId})
      .then(
        (coach) => {
          res.render('app/coach/dashboard', {
            page: 'app/coach/dashboard',
            title: 'Coach Page',
            includes: {
              external: ["fontawesome"]       
            },
            coach
          });
        }
      )
  } else {
    res.redirect('/');
  }
}
