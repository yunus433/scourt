const Team = require('../../../../models/team/Team');
const User = require('../../../../models/user/User');

module.exports = (req, res, next) => {
  if (req.body.id) {

    Team
      .findTeam(req.body.id, (err, team) => {
        if (err) return res.redirect('/app/dashboard');

        User
          .findByIdAndUpdate(req.session.user._id, {$set: {
            team: team
          }}, {upsert: true, new: true})
          .exec(
            (err, user) => {
              if (err) return console.log(err);

              Team
                .findByIdAndUpdate(team._id, {$push: {
                  "players": user
                }}, {upsert: true})
                .exec(
                  (err) => {
                    if (err) return console.log(err);
      
                    res.redirect('/app/dashboard');
                  }
                );
            }
          );
      })
  } else {
    return res.redirect('/app/dashboard')
  }
}; 
