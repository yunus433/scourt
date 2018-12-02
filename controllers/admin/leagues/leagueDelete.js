const mongoose = require('mongoose');
const League = require('../../../models/league/League');

module.exports = (req, res, next) => {
  League  
    .findByIdAndDelete(mongoose.Types.ObjectId(req.query.id))
    .exec(
      err => {
        if (err) return console.log(err);

        res.redirect('/admin/leagues');
      }
    );
};
