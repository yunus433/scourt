const Team = require('../../../../models/team/Team');
const User  = require('../../../../models/user/User');
const crypto = require('crypto');

module.exports = (req, res, next) => {
  if (req.body && req.body.name) {

    let id = crypto.randomBytes(8).toString('hex');
      

      let newTeamData = {
        teamId: id,
        name: req.body.name,
        description: req.body.description,
        creator: req.session.user
      };
    
      const newTeam = new Team(newTeamData);
      newTeam.save((err, team) => {
        if (err) return res.redirect('/de');
    
        User
          .findByIdAndUpdate(req.session.user._id, {$set: {
            team: team._id
          }}, {upsert: true, new: true})
          .exec(
            (err, user) => {
              if (err) return res.redirect('/de');
              
              req.session.user = user;
              return res.redirect('/de/dashboard');
            }
          );
      });

  } else {
    return res.redirect('/de/dashboard');
  }
}
