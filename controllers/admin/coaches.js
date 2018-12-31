const mongoose = require('mongoose');
const User = require('../../models/user/User');

module.exports = (req, res, next) => {
  User
    .find({"completed": false, "type": "coach"})
    .exec(
      (err, coaches) => {
        if (err) return console.log(err);
        res.render('admin/coaches', {
          page: 'admin/coaches',
          title: 'Antrenör Bilgileri',
          includes: {
            external: ["fontawesome"]
          },
          coaches
        })
      }
    );
}
