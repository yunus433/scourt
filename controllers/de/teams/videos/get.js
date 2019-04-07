module.exports = (req, res, next) => {
  res.render('de/team/video/new', {
    page: 'de/team/video/new',
    title: 'Video Upload',
    includes: {
      external: ['fontawesome', 'js', 'socket.io']
    },
    videoData: req.file,
    team: req.session.user.team
  });
};
