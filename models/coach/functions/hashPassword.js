const bcrypt = require("bcrypt");

module.exports = function(next) {
  let coach = this;
  
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return console.log(err);
    bcrypt.hash(coach.password, salt, (err, hash) => {
      coach.password = hash;
      next();
    });
  });

};
