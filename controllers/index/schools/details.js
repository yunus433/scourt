const Team = require('../../../models/team/Team');

module.exports = (req, res, next) => {

  Team
    .findById(req.query.id)
    .exec(
      (err, school) => {
        if (err) return console.log(err);

        res.render("index/schools/details", {
          page: "index/schools/details",
          title: school.name,
          includes: {
            external: ["fontawesome", "js"]
          },
          school
        });
      }
    )
};
