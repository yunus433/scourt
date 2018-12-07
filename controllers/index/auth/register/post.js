module.exports = (req, res, next) => {
  req.file.user = req.body.email;
  console.log(req.file);

  res.redirect('/auth/register');
}
