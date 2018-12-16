const crypto = require('crypto');
const Coach = require('../../../models/coach/Coach');

module.exports = (req, res, next) => {

  let id = crypto.randomBytes(8).toString('hex');
        
  let newCoachData = {
    email: id,
    password: 'scourt123'
  };

  const newCoach = new Coach(newCoachData);
  newCoach.save((err, result) => {
    if (err) return console.log(err);

    res.redirect('/admin/coaches');
  });
};
