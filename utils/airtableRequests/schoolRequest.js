const async = require("async");
const playerRequest = require("../../utils/airtableRequests/playerRequest");
const matchRequest = require("../../utils/airtableRequests/matchRequest");

let mainRecords = [];
let playerRecords = [];
let matchRecords = [];

module.exports = (base, array, callback) => {
  mainRecords = [];
  playerRecords = [];
  matchRecords = [];
  async.parallel(
    [
      function(asyncCallback) {
        base("Okullar")
          .select({
            view: "Grid view"
          })
          .eachPage(
            function page(schoolRecords, fetchNextPage) {
              schoolRecords.forEach(record => {
                mainRecords.push(record);
              });
              fetchNextPage();
            },
            function done(err) {
              if (err) {
                asyncCallback(err);
                return;
              }
              asyncCallback(undefined, mainRecords);
            }
          );
      },
      function(asyncCallback) {
        playerRequest(base, playerRecords, (err, players) => {
          if (err) return console.log(err);
          asyncCallback(undefined, players);
        });
      },
      function(asyncCallback) {
        matchRequest(base, matchRecords, (err, matches) => {
          if (err) return console.log(err);
          asyncCallback(undefined, matches);
        });
      }
    ],
    (err, arrays) => {
      if (err) return callback(err);
      async.each(
        arrays[0],
        (school, asyncCallback) => {
          school.playerData = [];
          school.matchData = [];
          school.matchTwoData = [];

          if (school.get("Oyuncular")) {
            arrays[1].forEach(player => {
              if (school.get("Oyuncular").includes(player.getId())) {
                school.playerData.push(player);
              }
            });
          }

          if (school.get("Maçlar")) {
            arrays[2].forEach(match => {
              if (school.get("Maçlar").includes(match.getId())) {
                school.matchData.push(match);
              }
            });
          }

          if (school.get("Maçlar 2")) {
            arrays[2].forEach(match => {
              if (school.get("Maçlar 2").includes(match.getId())) {
                school.matchTwoData.push(match);
              }
            });
          }

          array.push(school);
          asyncCallback();
        },
        () => {
          callback(undefined, array);
        }
      );
    }
  );
};
