const Team = require("../models/team/Team");
const User = require("../models/user/User");
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const streamingS3 = require('streaming-s3');
const moment = require('moment');

dotenv.config({path: path.join(__dirname, '/../.env')});

const {
  AWS_BUCKET,
  AWS_ACCESSKEYID,
  AWS_SECRETACCESSKEY
} = process.env;

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
        team: params.team,
        handled: params.handled
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
