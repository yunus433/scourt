const Team = require("../models/team/Team");
const User = require("../models/user/User");

module.exports = socket => {
  socket.on("joinTeam", params => {
    socket.join(params.team);
  });

  socket.on("sendMessage", (params, callback) => {
    if (!params.sender || !params.content || !params.team) return callback();

    User.findById(params.sender, (err, user) => {
      if (err) return false;

      let message = {
        sender: user,
        content: params.content,
        team: params.team
      };

      socket.to(params.team).emit("newMessage", { message });

      Team.findByIdAndUpdate(
        params.team,
        {
          $push: {
            "messages": message
          }
        },
        { upsert: true },
        err => {
          if (err) return callback(err);

          return callback(undefined, message);
        }
      );
    });
  });
};
