const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .find()
    .exec(
      (err, schools) => {
        if (err) return console.log(err);
        
        res.render("english/schools/schools", {
          page: "english/schools/schools",
          title: "Teams",
          includes: {
            external: ["fontawesome", "js"]
          },
          schools
        });
      }
    );
};
