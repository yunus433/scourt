const Team = require("../../models/team/Team");
const User = require("../../models/user/User");

const ObjectID = require("mongodb").ObjectID;

module.exports = (req, res, next) => {
  Team.findByIdAndUpdate(
    req.session.user.team,
    {
      $pull: {
        players: { _id: new ObjectID(req.query.id) }
      }
    },
    err => {
      if (err) return res.redirect("/");

      User.findByIdAndUpdate(
        new ObjectID(req.query.id),
        {
          $set: {
            team: undefined
          }
        },
        err => {
          if (err) return res.redirect("/");

          res.redirect("/players");
        }
      );
    }
  );
};
