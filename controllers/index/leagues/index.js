const League = require('./../../../models/league/League');

module.exports = (req, res, next) => {

    League
      .find()
      .exec(
        (err, leagues) => {
          if (err) return console.log(err);

          res.render("index/leagues/leagues", {
            page: "index/leagues/leagues",
            title: "Ligler",
            includes: {
              external: ["fontawesome", "js"]
            },
            leagues
          });
        }
      );
};
