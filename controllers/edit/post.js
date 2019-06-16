const User = require('../../models/user/User');
const Team = require('../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.session.user.type == 'user') {
    if (req.body && req.body.name && req.body.date && req.body.email) {
      User.findOneAndUpdate(
        { email: req.session.user.email },
        {
          $set: {
            name: req.body.name,
            surname: req.body.surname,
            date: req.body.date,
            email: req.body.email,
            phone: req.body.phone || undefined
          }
        },
        { upsert: true, new: true }
      ).exec((err, user) => {
        if (err && err.code == 11000) {
          return res.redirect("/edit/?err=2");
        }
        if (err) return res.redirect('/');
  
        if (user.team) {
          Team.findOneAndUpdate({"players.email": user.email}, {$set: {
            "players.$.name": user.name,
            "players.$.date": user.date,
            "players.$.email": user.email,
            "players.$.phone": user.phone,
          }}, err => {
            if (err) return res.redirect('/');
  
            res.redirect("/dashboard");
          });
        } else {
          res.redirect("/dashboard");
        };
      });
    } else {
      res.redirect("/edit/?err=1");
    }
  } else if (req.session.user.type == 'coach') {
    if (req.body && req.body.name && req.body.email) {
      User.findOneAndUpdate(
        { email: req.session.user.email },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            surname: req.body.surname,
            date: req.body.date,
            phone: req.body.phone || undefined
          }
        },
        { upsert: true, new: true }
      ).exec((err, user) => {
        if (err && err.code == 11000) {
          return res.redirect('/edit/?err=2');
        }
        if (err) return res.redirect('/');
        
        const creator = {
          name: user.name,
          surname: user.surname,
          color: user.color,
          _id: user._id
        };

        if (user.team) {
          Team.findOneAndUpdate({"creator.email": user.email}, {$set: {
            "creator": creator
          }}, err => {
            if (err) return res.redirect('/');
  
            res.redirect("/dashboard");
          });
        } else {
          res.redirect("/dashboard");
        };
      });
    } else {
      return res.redirect('/edit/?err=1')
    }
  } else {
    return res.redirect('/');
  };
};
