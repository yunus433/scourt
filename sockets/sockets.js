const Message = require("../models/message/Message");
const Team = require("../models/team/Team");
const Coach = require("../models/coach/Coach");
const User = require("../models/user/User");

module.exports = socket => {
  socket.on("joinTeam", params => {
    socket.join(params.team);
  });

  socket.on("sendMessage", (params, callback) => {
    if (!params.sender || !params.content || !params.team) return callback();

    let user;

    User.findById(params.sender, (err, data) => {
      if (err) return false;

      if (data) {
        user = data;

        let message = {
          sender: user,
          content: params.content,
          team: params.team
        };

        socket.to(params.team).emit("newMessage", { message });
        socket.emit("newMessage", { message });

        let newMessageData = {
          sender: user,
          content: params.content,
          team: params.team
        };

        let newMessage = new Message(newMessageData);

        newMessage.save((err, message) => {
          if (err) return console.log(err);

          Team.findByIdAndUpdate(
            params.team,
            {
              $push: {
                messages: message
              }
            },
            err => {
              if (err) return callback(err);

              return callback();
            }
          );
        });
      } else {
        Coach.findById(params.sender, (err, data) => {
          if (err) return false;

          user = data;

          let message = {
            sender: user,
            content: params.content,
            team: params.team
          };

          socket.to(params.team).emit("newMessage", { message });
          socket.emit("newMessage", { message });

          let newMessageData = {
            sender: user,
            content: params.content,
            team: params.team
          };

          let newMessage = new Message(newMessageData);

          newMessage.save((err, message) => {
            if (err) return console.log(err);

            Team.findByIdAndUpdate(
              params.team,
              {
                $push: {
                  messages: message
                }
              },
              err => {
                if (err) return callback(err);

                return callback();
              }
            );
          });
        });
      }
    });
  });
};
