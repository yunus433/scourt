const Coach = require('../../../../models/coach/Coach');
const Team = require('../../../../models/team/Team');
const Message = require('../../../../models/message/Message');

module.exports = (req, res, next) => {
  if (req.session.coach) {
    Coach
      .findOne({email: req.session.coach.email})
      .then(
        (coach) => {

          Team
            .find()
            .exec(
              (err, teams) => {
                if (err) return console.log(err);
                let cantFind = true;

                teams.forEach(team => {
                  if (team.creator._id == req.session.coach._id.toString()) {
                    cantFind = false;
                    messages = [];

                    Message
                      .find()
                      .exec(
                        (err, messages) => {
                          if (err) return console.log(err);

                          messages.forEach(message => {

                            if (message.team._id == team._id) {
                              messages.push(message);
                            }
                          });

                          return res.render('app/coach/dashboard', {
                            page: 'app/coach/dashboard',
                            title: 'Coach Page',
                            includes: {
                              external: ["fontawesome", "js", "socket.io"]       
                            },
                            coach,
                            team: team,
                            messages
                          });
                        });
                    }
                });

                if (cantFind) {
                  res.render('app/coach/dashboard', {
                    page: 'app/coach/dashboard',
                    title: 'Coach Page',
                    includes: {
                      external: ["fontawesome", "js", "socket.io"]       
                    },
                    coach
                    });
                  }
                }
            );
        }
      )
  } else {
    res.redirect('/');
  }
}
