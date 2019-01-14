const fs = require('fs');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndUpdate(req.query.id, {$set: {
      teamPhoto: req.file.filename
    }}, {upsert: true})
    .exec(
      (err, team) => {
        if (err) return res.redirect('/');

        fs.unlink("./public/res/uploads/" + team.teamPhoto, err => {
          if (err) return res.redirect('/');

          return res.redirect('/app/team/edit/?id=' + req.query.id);
        });
      }
    );
};
