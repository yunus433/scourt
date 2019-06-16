const sendMail = require('../../../../utils/sendMail');
const User = require('../../../../models/user/User');

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = (req, res, next) => {
  if (req.session.email) {
    let newUserData = {
      email: req.session.email,
      password: req.body.password,
      type: "user",
      color: getRandomColor()
    }; 

    const newUser = new User(newUserData);

    newUser.save((err, user) => {
      if (err) return res.redirect('/'); 

      sendMail({
        email: user.email,
      }, 'userRegister', () => {
        req.session.email = null;
        req.session.user = user;
        return res.redirect('/auth/validate');
      });
    });
  } else {
    return res.redirect('/');
  }
}
