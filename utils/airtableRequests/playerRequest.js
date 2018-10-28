const async = require("async");
let schoolRecordsMain = [];
let mainRecords = [];

module.exports = (base, array, callback) => {
  schoolRecordsMain = [];
  mainRecords = [];

  async.parallel([
    function (asyncCallback) {
      base("Oyuncular")
      .select({
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPageOne) {
          records.forEach(record => {
            mainRecords.push(record);
          })
          fetchNextPageOne();
        },
        function done(err) {
          if (err) return callback(err);
          asyncCallback(undefined, mainRecords);
        }
      );
    }, 
    function (asyncCallback) {
      base("Okullar")
      .select({
        view: "Grid view"
      })
      .eachPage(
        function page(schoolRecords, fetchNextPage) {
          schoolRecords.forEach(record => {
            schoolRecordsMain.push(record);
          })
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            asyncCallback(err);
            return;
          }
          asyncCallback(undefined, schoolRecordsMain);
        })
    }], (err, arrays) => {
      if (err) return callback(err);
      arrays[0].forEach(function(record) {
        arrays[1].forEach(function(schoolRecord) {
          if (record.get("Okul") == schoolRecord.getId()) {
            record.school = schoolRecord;
            array.push(record);
          }
        });
      });
      callback(undefined, array);
    });
};
