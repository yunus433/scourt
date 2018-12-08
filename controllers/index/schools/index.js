const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {
  Team
    .find()
    .exec(
      (err, schools) => {
        if (err) return console.log(err);
        
        res.render("index/schools/schools", {
          page: "index/schools/schools",
          title: "Takımlar",
          includes: {
            external: ["fontawesome", "js"]
          },
          schools
        });
      }
    );
};
