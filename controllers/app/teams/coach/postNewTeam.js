const Team = require('../../../../models/team/Team');
const Coach  = require('../../../../models/coach/Coach');
const crypto = require('crypto');

module.exports = (req, res, next) => {
  if (req.body && req.body.name) {

    let id = crypto.randomBytes(8).toString('hex');
      
    if (req.file) {

      let newTeamData = {
        teamId: id,
        name: req.body.name,
        description: req.body.description,
        teamPhoto: req.file.filename,
        creator: req.session.coach
      };
    
      const newTeam = new Team(newTeamData);
      newTeam.save((err, team) => {
        if (err) return console.log(err);
    
        Coach
          .findByIdAndUpdate(req.session.coach._id, {$set: {
            team
          }}, {upsert: true})
          .exec(
            (err) => {
              if (err) return console.log(err);
              
              return res.redirect('/app/coach/dashboard');
            }
          );
      });

    } else {

      let newTeamData = {
        teamId: id,
        name: req.body.name,
        description: req.body.description,
        creator: req.session.coach
      };
    
      const newTeam = new Team(newTeamData);
      newTeam.save((err, team) => {
        if (err) return console.log(err);
    
        Coach
          .findByIdAndUpdate(req.session.coach._id, {$set: {
            team
          }}, {upsert: true})
          .exec(
            (err) => {
              if (err) return console.log(err);
              
              return res.redirect('/app/coach/dashboard');
            }
          );
      });
    };


  } else {
    return res.redirect('/app/coach/dashboard');
  }
}
