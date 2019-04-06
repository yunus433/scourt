
module.exports = (req, res, next) => {
  res.render('app/team/video/new', {
    page: 'app/team/video/new',
    title: 'Video Upload',
    includes: {
      external: ['fontawesome', 'js', 'socket.io']
    },
    videoData: req.file,
    team: req.session.user.team
  });
};
