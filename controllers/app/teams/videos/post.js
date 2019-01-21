const fs = require("fs");
const moment = require("moment");
const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  if (req.file) {
    const videoObject = {
      name: "Default Video Name",
      createdAt: moment(Date.now()).format("dddd, MMMM Do YYYY"),
      comments: [],
      file: req.file.filename
    };

    Team.findOneAndUpdate(
      { _id: req.query.id },
      {
        $push: {
          videos: videoObject
        }
      },
      (err, team) => {
        if (err) return res.redirect("/");

        return res.redirect("/app/team/videos/?id=" + team.teamId);
      }
    );
  } else {
    return res.redirect("/");
  }
};
