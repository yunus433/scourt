const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findByIdAndDelete(mongoose.Types.ObjectId(req.query.id))
    .exec(
      (err) => {
        if (err) return console.log(err);
        res.redirect('/admin/teams');
      }
    );
}
