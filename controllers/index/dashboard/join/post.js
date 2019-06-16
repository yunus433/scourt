const Team = require('../../../../models/team/Team');
const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.body.id) {

    Team
      .findTeam(req.body.id, (err, team) => {
        if (err) return res.redirect('/dashboard');

        User
          .findOneAndUpdate({"email": req.session.user.email}, {$set: {
            team: team._id
          }}, {upsert: true, new: true})
          .exec(
            (err, user) => {
              if (err) return res.redirect('/');

              Team
                .findByIdAndUpdate(team._id, {$push: {
                  "players": user
                }}, {upsert: true})
                .exec(
                  (err) => {
                    if (err) return res.redirect('/');
      
                    req.session.user = user;
                    res.redirect('/dashboard');
                  }
                );
            }
          );
      })
  } else {
    return res.redirect('/dashboard')
  }
}; 
