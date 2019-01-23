const crypto = require("crypto");
const User = require("../../../../models/user/User");

module.exports = (req, res, next) => {
  let id = crypto.randomBytes(8).toString("hex");

  let newUserData = {
    email: id,
    password: "scourt123",
    type: "coach",
    profilePhoto: "/res/uploads/defaultCoachPicture.png"
  };

  const newUser = new User(newUserData);
  newUser.save(err => {
    if (err) return res.redirect('/');

    res.redirect("/admin/coaches");
  });
};
