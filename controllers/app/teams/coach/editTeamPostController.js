const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.file) {
    Team
      .findByIdAndUpdate(req.query.id, {$set: {
        name: req.body.name,
        description: req.body.description, 
        creator: req.session.coach,
        teamPhoto: req.file.filename
      }}, {upsert: true})
      .exec(
        (err) => {
          if (err) return console.log(err);

          return res.redirect('/app/coach/dashboard');
        }
      );
  } else {
    Team
      .findByIdAndUpdate(req.query.id, {$set: {
        name: req.body.name,
        description: req.body.description, 
        creator: req.session.coach
      }}, {upsert: true})
      .exec(
        (err) => {
          if (err) return console.log(err);

          return res.redirect('/app/coach/dashboard');
        }
      );
  }
};
