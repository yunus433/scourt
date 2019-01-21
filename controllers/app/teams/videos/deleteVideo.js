const fs = require('fs');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndUpdate(req.query.id, {$pull: {
      "videos": {"file": req.query.video}
    }}, (err, team) => {
      if (err) return res.redirect('/');
      fs.unlink("./public/res/uploads/" + req.query.video, err => {
        if (err) return res.redirect("/");

        return res.redirect('/app/team/videos/?id=' + team.teamId);
      });
    });
};
