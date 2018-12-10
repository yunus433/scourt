const mongoose = require('mongoose');
const Coach = require('../../../models/coach/Coach');

module.exports = (req, res, next) => {
  Coach
    .find({"completed": false})
    .exec(
      (err, coaches) => {
        if (err) return console.log(err);
        res.render('admin/coaches', {
          page: 'admin/coaches',
          title: 'Antrenör Bilgileri',
          includes: {
            external: ["fontawesome"]
          },
          coaches
        })
      }
    );
}
