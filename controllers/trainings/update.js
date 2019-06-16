const Team = require('../../models/team/Team');

module.exports = (req, res, next) => {
  let notFound = true;

  Team
    .findById(req.session.user.team, (err, team) => {
      if (err) return res.redirect('/');
      
      team.trainings.forEach(training => {
        if (training._id == req.query.id) {
          if (training.comingPlayers.filter(comingUser => comingUser._id == req.session.user._id).length > 0) {
            notFound = false;
          }
        }
      });

      if (!notFound) {
        Team
          .findOneAndUpdate({"_id": req.session.user.team, "trainings._id": req.query.id}, {$pull: {
            "trainings.$.comingPlayers": {"email": req.session.user.email}
          }}, {upsert: true}, err => {
            if (err) return res.redirect('/');
    
            Team
              .findOneAndUpdate({"_id": req.session.user.team, "trainings._id": req.query.id}, {$push: {
                "trainings.$.notComingPlayers": req.session.user
              }}, {upsert: true}, err => {
                if (err) return res.redirect('/');
    
                res.redirect('/trainings');
              });
          });
      } else {
        Team
          .findOneAndUpdate({"_id": req.session.user.team, "trainings._id": req.query.id}, {$pull: {
            "trainings.$.notComingPlayers": {"email": req.session.user.email}
          }}, {upsert: true}, err => {
            if (err) return res.redirect('/');
    
            Team
              .findOneAndUpdate({"_id": req.session.user.team, "trainings._id": req.query.id}, {$push: {
                "trainings.$.comingPlayers": req.session.user
              }}, {upsert: true}, err => {
                if (err) return res.redirect('/');
    
                res.redirect('/trainings');
              });
          });
      };
    });
};
