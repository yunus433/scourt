const crypto = require("crypto");
const User = require("../../../../models/user/User");

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = (req, res, next) => {
  let id = crypto.randomBytes(8).toString("hex");

  let newUserData = {
    email: id,
    password: "scourt123",
    type: "coach",
    profilePhoto: "/res/uploads/defaultCoachPicture.png",
    color: getRandomColor()
  };

  const newUser = new User(newUserData);
  newUser.save(err => {
    if (err) return res.redirect('/');

    res.redirect("/admin/coaches");
  });
};
