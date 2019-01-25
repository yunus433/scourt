const User = require('../../../models/user/User');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.session.user.type == 'user') {
    if (req.body && req.body.name && req.body.date) {
      User.findOneAndUpdate(
        { email: req.session.user.email },
        {
          $set: {
            name: req.body.name,
            date: req.body.date,
            email: req.body.email,
            phone: req.body.phone || undefined
          }
        },
        { upsert: true, new: true }
      ).exec((err, user) => {
        if (err && err.code == 11000) {
          return res.redirect("/de/edit/?err=2");
        }
        if (err) return res.redirect('/de');
  
        if (user.team) {
          Team.findOneAndUpdate({"players.email": user.email}, {$set: {
            "players.$.name": user.name,
            "players.$.date": user.date,
            "players.$.email": user.email,
            "players.$.phone": user.phone,
          }}, err => {
            if (err) return res.redirect('/');
  
            res.redirect("/de/dashboard");
          });
        } else {
          res.redirect("/de/dashboard");
        };
      });
    };
  } else if (req.session.user.type == 'coach') {
    if (req.body && req.body.name) {
      User.findOneAndUpdate(
        { email: req.session.user.email },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone || undefined
          }
        },
        { upsert: true }
      ).exec(err => {
        if (err && err.code == 11000) {
          return res.redirect('/de/edit/?err=2');
        }
        if (err) return res.redirect('/de');
        
        if (user.team) {
          Team.findOneAndUpdate({"creator.email": user.email}, {$set: {
            "creator": user
          }}, err => {
            if (err) return res.redirect('/de');
  
            res.redirect("/de/dashboard");
          });
        } else {
          res.redirect("/de/dashboard");
        };
      });
    } else {
      return res.redirect('/de/edit/?err=1')
    }
  } else {
    return res.redirect('/de');
  };
};
