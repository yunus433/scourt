const Coach = require('../../../../models/coach/Coach');

module.exports = (req, res, next) => {

  Coach
    .findOneAndUpdate({email: req.session.coach.email}, {$set: {
      profileFoto: req.file.filename
    }}, {upsert: true})
    .exec((err, coach) => {
      if (err || !coach) return res.redirect('/'); 

      res.redirect('/app/coach/validate');
    });
};
