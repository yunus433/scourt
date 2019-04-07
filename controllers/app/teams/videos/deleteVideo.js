const Team = require('../../../../models/team/Team');
const AWS = require('aws-sdk');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, '/../.env')});

const {
  AWS_ACCESSKEYID,
  AWS_SECRETACCESSKEY
} = process.env;

AWS.config = {
  credentials: {
    accessKeyId: AWS_ACCESSKEYID, 
    secretAccessKey: AWS_SECRETACCESSKEY
  },
  region: 'us-west-2'
};

module.exports = (req, res, next) => {
  Team
    .findOneAndUpdate({"_id": req.session.user.team}, {$pull: {
      "videos": {"_id": req.query.id}
    }}, (err, team) => {
      if (err) return res.redirect('/');
      
      const params = {
        Bucket: "scourtapp-video-database",
        Key: team._id + "/" + req.query.id
      };

      const s3 = new AWS.S3()

      s3.deleteObject(params, err => {
        if (err) return res.redirect('/');

        res.redirect("/app/team/videos");
      });
    });
};
