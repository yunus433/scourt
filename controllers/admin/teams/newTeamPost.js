const mongoose = require('mongoose');
const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
    let newTeamData =  {
      name: req.body.name,
      players: [],
      logo: req.body.logo
    }

    const newTeam = new Team(newTeamData);
    newTeam.save((err, result) =>  {
      if (err) return console.log(err);

      res.redirect('/admin/teams/addPlayer/?id=' + result._id);
    });
}
