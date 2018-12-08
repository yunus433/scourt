const League = require('./../../../models/league/League');

module.exports = (req, res, next) => {

    League
      .find()
      .exec(
        (err, leagues) => {
          if (err) return console.log(err);

          res.render("english/leagues/leagues", {
            page: "english/leagues/leagues",
            title: "Leagues",
            includes: {
              external: ["fontawesome", "js"]
            },
            leagues
          });
        }
      );
};
