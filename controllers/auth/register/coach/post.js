const crypto = require("crypto");
const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  let id = crypto.randomBytes(8).toString("hex");

  let newUserData = {
    email: id,
    password: "scourt123",
    type: "coach",
    profilePhoto: "defaultCoachPicture.png"
  };

  const newUser = new User(newUserData);
  newUser.save(err => {
    if (err) return console.log(err);

    res.redirect("/admin/coaches");
  });
};
