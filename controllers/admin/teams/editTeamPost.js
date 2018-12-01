const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.query.id)},  {$set: {
      "name": req.body.name,
      "logo": req.body.logo
    }}, {upsert: true})
    .exec((err) => {
      if (err) return console.log(err);

      res.redirect('/admin/teams');
    });
};
