const schoolRequest = require('../../utils/airtableRequests/schoolRequest');
let arrayschools = [];

module.exports = (req, res, next) => {
  arrayschools = [];

  schoolRequest(req.base, arrayschools, (err, schools) => {
    if (err) return console.log(err);
    schools.forEach(school => {
      if (school.getId() == req.query.id) {
        res.render("schools/details", {
          page: "schools/details",
          title: school.get("Name"),
          includes: {
            external: ["fontawesome", "js", "js-header"]
          },
          school
        });
      }
    });
  });
};
