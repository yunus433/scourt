const fs = require('fs');
const User = require('../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.file) {
    req.cloudinary.v2.uploader.upload("./public/res/uploads/" + req.file.filename, {
      public_id: "image_folder/" + req.file.filename,
      quality: 25,
      format: "JPG"
    }, (err, result) => {
      if (err) return res.redirect('/');

      User
        .findOneAndUpdate({"email": req.session.user.email}, {$set: {
          profilePhoto: result.url
        }}, {upsert: true})
        .exec((err, user) => {
          if (err) return res.redirect('/');

          fs.unlink("./public/res/uploads/" + req.file.filename, err => {
            if (err) return res.redirect('/');

            if (user.profilePhoto == "/res/uploads/defaultUserPicture.png" || user.profilePhoto == "/res/uploads/defaultCoachPicture.png") {
              res.redirect('/auth/validate/profile');
            } else {
              req.cloudinary.v2.uploader.destroy("image_folder/" + user.profilePhoto.split("/")[user.profilePhoto.split("/").length-1].split(".")[0], err => {
                if (err) return res.redirect('/');

                res.redirect('/auth/validate/profile')
              });
            };
          });
        });
    });
  } else {
    return res.redirect('/auth/validate/profile');
  }
}
