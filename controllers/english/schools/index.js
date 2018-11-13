const schoolRequest = require('./../../../utils/airtableRequests/schoolRequest');
let arrayschools = [];

module.exports = (req, res, next) => {
  arrayschools = [];

  schoolRequest(req.base, arrayschools, (err, schools) => {
    if (err) return console.log(err);
    res.render("english/schools/schools", {
      page: "english/schools/schools",
      title: "Schools",
      includes: {
        external: ["fontawesome", "js"]
      },
      schools
    });
  });
};
