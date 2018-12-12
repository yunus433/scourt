const bcrypt = require('bcrypt');

module.exports = function (password, coach, callback) {
  bcrypt.compare(password, coach.password, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};
