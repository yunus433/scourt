module.exports = (req, res, next) => {
  res.render('analysis/new', {
    page: 'analysis/new',
    title: 'Video Upload',
    includes: {
      external: ['fontawesome', 'js', 'socket.io']
    },
    user: req.session.user,
    videoData: req.file,
    team: req.session.user.team
  });
};
