const async = require('async');

const tenPlayerRequest = require('../mainRequests/tenPlayerRequest');
const fiveMatchRequest =  require('../mainRequests/fiveMatchRequest');
const tournamentRequest = require('../airtableRequests/tournamentRequest');

module.exports = (arrayPlayers, arrayMatches, arrayTournaments, base, callback) => {

  async.parallel([
    function (asyncCallback) {
      tenPlayerRequest(base, arrayPlayers, (err, players) => {
        if (err) return asyncCallback(err); 
        asyncCallback(undefined, players);
      });
    },
    function (asyncCallback) {
      fiveMatchRequest(base, arrayMatches, (err, matches) => {
        if (err) return asyncCallback(err);
        asyncCallback(undefined, matches);
      });
    },
    function (asyncCallback) {
      tournamentRequest(base, arrayTournaments, (err, tournaments) => {
        if (err) return asyncCallback(err);
        asyncCallback(undefined, tournaments);
      });
    }], function(err, array) {
      if (err) return console.log(err);
      callback(undefined, array);
    });
};
