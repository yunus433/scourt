const League = require('./../../../models/league/League');

module.exports = (req, res, next) => {

    League
      .find()
      .exec(
        (err, leagues) => {
          if (err) return console.log(err);

          res.render("german/leagues/leagues", {
            page: "german/leagues/leagues",
            title: "Ligen",
            includes: {
              external: ["fontawesome", "js"]
            },
            leagues
          });
        }
      );
};
