const fs = require("fs");
const moment = require("moment");
const Team = require("../../../../models/team/Team");

module.exports = (req, res, next) => {
  const videoObject = {
    name: "Default Video Name",
    createdAt: moment(Date.now()).format("dddd, MMMM Do YYYY"),
    comments: [],
    url: "https://res.cloudinary.com/dvnac86j8/video/upload/v1548182773/video_folder/team_" + req.session.user.team + "/" + req.body.videoId,
    completed: true,
    _id: req.body.videoId
  };

  Team
    .findOneAndUpdate(
    { "videos._id": req.body.videoId },
    {
      $set: {
        "videos": videoObject
      }
    }, err => {
      if (err) return res.redirect("/");

      return res.redirect("/app/team/videos");
    });
};
