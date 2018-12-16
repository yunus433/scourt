const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findById(req.query.id)
    .exec((err, team) => {
      if (err) return res.redirect('/');

      res.render('app/coach/team', {
        page: 'app/coach/team',
        title: 'Team Page',
        includes: {
          external: ["fontawesome"]       
        },
        team,
        coach: req.session.coach
      });
    });
};
