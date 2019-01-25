const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findOneAndUpdate({"_id": req.session.user.team}, {$pull: {
      "videos": {"_id": req.query.id}
    }}, (err, team) => {
      if (err) return res.redirect('/de');
      req.cloudinary.v2.api.delete_resources(["video_folder/team_" + req.session.user.team + "/" + req.query.id], {
        "resource_type": "video"
      }, err => {
        if (err) return res.redirect('/de');

        return res.redirect('/de/team/videos');
      });
    });
};
