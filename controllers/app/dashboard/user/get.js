const User = require('../../../../models/user/User');
const Message = require('../../../../models/message/Message');
const Team = require('../../../../models/team/Team');

module.exports = (req, res, next) => {
  if (req.session.user) {
    User
      .findOne({email: req.session.user.email})
      .then(
        (user) => {
          let messagesArray = [];
           
          if (user.team) {

            Message
              .find()
              .exec(
                (err, messages) => {
                  if (err) return console.log(err);

                  messages.forEach(message => {

                    if (message.team._id == user.team._id) {
                      messagesArray.push(message);
                    }
                  });

                  Team
                    .findById(user.team, (err, team) => {
                      if (err) return console.log(err);

                      if (team) {
                        return res.render('app/main/dashboard', {
                          page: 'app/main/dashboard',
                          title: 'Main Page',
                          includes: {
                            external: ["fontawesome", "js", "socket.io"]       
                          },
                          user,
                          team,
                          messages: messagesArray
                        });
                      } else {
                        return res.render('app/main/dashboard', {
                          page: 'app/main/dashboard',
                          title: 'Main Page',
                          includes: {
                            external: ["fontawesome", "js", "socket.io"]       
                          },
                          user,
                          messages: messagesArray
                        });
                      }
                    }); 
                });
          } else {
            res.render('app/main/dashboard', {
              page: 'app/main/dashboard',
              title: 'Main Page',
              includes: {
                external: ["fontawesome", "js", "socket.io"]       
              },
              user
            });
          }
        }
      )
  } else {
    res.redirect('/');
  }
}
