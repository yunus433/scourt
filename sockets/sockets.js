const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const streamingS3 = require('streaming-s3');
const moment = require('moment');

const Team = require('../models/team/Team');
const User = require('../models/user/User');

dotenv.config({path: path.join(__dirname, '/../.env')});

const {
  AWS_BUCKET,
  AWS_ACCESSKEYID,
  AWS_SECRETACCESSKEY
} = process.env;

module.exports = socket => {
  socket.on("join", params => {
    socket.join(params.room.toString());
  });

  socket.on("leave", params => {
    socket.leave(params.room)
  })

  socket.on("sendMessage", (params, callback) => {
    if (!params.from || !params.type || !params.content || !params.to) return callback(true);

    User.findById(params.from, (err, user) => {
      if (err) return callback(true);

      let message = {
        from: {
          "_id": params.from,
          "color": user.color,
          "name": user.name
        },
        content: params.content,
        to: params.to
      };

      if (params.type == "team") {
        Team.findByIdAndUpdate(
          params.to,
          {
            $push: {
              "messages": message
            }
          },
          { upsert: true },
          (err, team) => {
            if (err) return callback(err);
  
            team.players.forEach(player => {
              if (player._id != params.from) {
                socket.to(player._id.toString()).emit("newMessage",  message);

                socket.to(player._id.toString()).emit("newNotification", {
                  title: "You have a message from your team",
                  content: "Click to view it",
                  url: "/app/team/messages/?room=" + team._id.toString()
                });
              };
            });
             
            return callback(undefined, message);
          }
        );
      } else {
        socket.to(params.to).emit("newMessage",  message);

        User.findByIdAndUpdate(
          params.to, {
          $push: {
            messages: message
          }
        },
        {upsert: true},
        err => {
          if (err) return callback(err);

          User.findByIdAndUpdate(
            params.from, {
            $push: {
              messages: message
            }
          },
          {upsert: true},
          (err, user) => {
            if (err) return callback(err);

            socket.to(params.to).emit("newNotification", {
              title: "You have a message from " + user.name,
              content: "Click to view it",
              url: "/app/team/messages/?room=" + user._id.toString()
            });
  
            return callback(undefined, message);
            });
          });
      };
    });
  });

  socket.on("startVideoUpload", (params, callback) => {
    const fStream = fs.createReadStream(__dirname + '/../public/res/uploads/' + params.data.filename);
    const uploader = new streamingS3(fStream, {accessKeyId: AWS_ACCESSKEYID, secretAccessKey: AWS_SECRETACCESSKEY},
      {
        Bucket: AWS_BUCKET + "/" + params.team,
        Key: params.data.filename,
        ContentType: params.data.mimetype
      }
    );
    
    uploader.on("data", (bytesRead) => {
      socket.emit("dataVideoUpload", {bytesRead});
    });

    uploader.on("finished", (response, status) => {
      const videoObject = {
        name: "Default Video Name",
        createdAt: moment(Date.now()).format("dddd, MMMM Do YYYY"),
        comments: [],
        url: "https://s3-us-west-2.amazonaws.com/scourtapp-video-database/" + params.team + "/" + params.data.filename,
        completed: true,
        _id: params.data.filename
      };
      Team
        .findByIdAndUpdate(params.team, {$push: {
          "videos": videoObject
        }}, {upsert: true}, err => {
          if (err) return socket.emit("videoUploadError", {err});

          fs.unlink(__dirname + "/../public/res/uploads/" + params.data.filename, err => {
            if (err) return socket.emit("videoUploadError", {err});
            
            socket.emit("finishVideoUpload", {response});
          });
        });
    });

    uploader.on("error", (err) => {
      console.log(err);
      socket.emit("videoUploadError", {err});
    });

    uploader.begin();
  });
};
