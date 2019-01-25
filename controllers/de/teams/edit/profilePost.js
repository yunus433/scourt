const fs = require('fs');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.file) {
    req.cloudinary.v2.uploader.upload("./public/res/uploads/" + req.file.filename, {
      public_id: "image_folder/" + req.file.filename,
      quality: 25,
      format: "JPG"
    }, (err, result) => {
      if (err) return res.redirect('/de');
  
      Team
        .findByIdAndUpdate(req.session.user.team, {$set: {
          profilePhoto: result.url
        }}, {upsert: true})
        .exec((err, team) => {
          if (err) return res.redirect('/');

          if (team.profilePhoto != "/res/public/uploads/defaultTeamPicture.png") {
            req.cloudinary.v2.uploader.destroy("image_folder/" + team.profilePhoto.split("/")[team.profilePhoto.split("/").length-1].split(".")[0], err => {
              if (err) return res.redirect('/de');

              fs.unlink("./public/res/uploads/" + req.file.filename, err => {
                if (err) return res.redirect('/de');

                res.redirect('/de/team/edit');
              });
            });
          } else {
            fs.unlink("./public/res/uploads/" + req.file.filename, err => {
              if (err) return res.redirect('/de');

              res.redirect('/de/team/edit');
            });
          };
        });
      });
  } else {
    return res.redirect("/de/team/edit")
  };
};
