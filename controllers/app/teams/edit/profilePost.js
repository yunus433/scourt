const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndUpdate(req.query.id, {$set: {
      teamPhoto: req.file.filename
    }}, {upsert: true})
    .exec(
      (err) => {
        if (err) return console.log(err);

        return res.redirect('/app/team/edit/?id=' + req.query.id);
      }
    );
}
