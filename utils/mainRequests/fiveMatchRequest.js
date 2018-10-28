const async = require("async");

let tournamentRecordsMain = [];
let schoolRecordsMain = [];
let mainRecords = [];

module.exports = (base, array, callback) => {
  tournamentRecordsMain = [];
  schoolRecordsMain = [];
  mainRecords = [];
  async.parallel([
    function (asyncCallback) {
      base("Maçlar")
      .select({
        view: "Grid view",
        pageSize: 5,
        maxRecords: 5
      })
      .eachPage(
        function page(records, fetchNextPageOne) {
          records.forEach(record => {
            mainRecords.push(record);
          })
          fetchNextPageOne();
        },
        function done(err) {
          if (err) return asyncCallback(err);
          asyncCallback(undefined, mainRecords);
        }
      );
    },
    function (asyncCallback) {
      base("Turnuvalar")
        .select({
          view: "Grid view",
          pageSize: 1,
        })
        .eachPage(
          function page(records, fetchNextPageTwo) {
            records.forEach(record => {
              tournamentRecordsMain.push(record);
            })
            fetchNextPageTwo();
          },
          function done(err) {
            if (err) return asyncCallback(err);
            asyncCallback(undefined, tournamentRecordsMain);
          }
        );
      }, 
    function (asyncCallback) {
        base("Okullar")
          .select({
            view: "Grid view",
          })
          .eachPage(
            function page(records, fetchNextPageOne) {
              records.forEach(record => {
                schoolRecordsMain.push(record);
              })
              fetchNextPageOne();
            },
            function done(err) {
              if (err) return callback(err);
              asyncCallback(undefined, schoolRecordsMain);
            }
          );
      }], (err, arrays) => {
      if (err) return callback(err);
      arrays[0].forEach(function(record) {
        arrays[2].forEach(function(schoolRecord) {
          if (record.get("Takım 1") == schoolRecord.getId()) {
            record.teamOne = schoolRecord;
            arrays[2].forEach(function(schoolRecord) {
              if (record.get("Takım 2") == schoolRecord.getId()) {
                record.teamTwo = schoolRecord;
                arrays[1].forEach(function(tournamentRecord) {
                  if (record.get("Lig") == tournamentRecord.getId()) {
                    record.league = tournamentRecord;
                    array.push(record);
                  };
                });
              };
            });
          }; 
        });
      });
      callback(undefined, array);
  });
};


