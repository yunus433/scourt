const bcrypt = require('bcrypt');

module.exports = function (password, user, callback) {
  bcrypt.compare(password, user.password, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};
