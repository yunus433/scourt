const async = require("async");
const matchRequest = require("../../utils/airtableRequests/matchRequest");

let mainRecord = [];
let arrayMatches = [];

module.exports = (base, array, callback) => {
  arrayMatches = [];
  mainRecord = [];

  async.parallel(
    [
      function(asyncCallback) {
        base("Turnuvalar")
          .select({
            view: "Grid view"
          })
          .eachPage(
            function page(records, fetchNextPageOne) {
              records.forEach(record => {
                mainRecord.push(record);
              });
              fetchNextPageOne();
            },
            function done(err) {
              if (err) return asyncCallback(err);
              asyncCallback(undefined, mainRecord);
            }
          );
      },
      function(asyncCallback) {
        matchRequest(base, arrayMatches, (err, matches) => {
          if (err) return console.log(err);
          asyncCallback(undefined, matches);
        });
      }
    ],
    (err, arrays) => {
      if (err) return console.log(err);
      arrays[0].forEach(tournament => {
        tournament.matches = [];
        arrays[1].forEach(matchRecord => {
          tournament.get("Maçlar").forEach(match => {
            if (match == matchRecord.getId()) {
              tournament.matches.push(matchRecord);
            }
          });
        });
        array.push(tournament);
      });
      callback(undefined, array);
    }
  );
};
