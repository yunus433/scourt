window.onload = () => {
  const joinTeamButton = document.querySelector('.join-team-button');
  const notMember = document.querySelector('.content-right-not-member');
  const joinTeam = document.querySelector('.content-right-join-team');

  if (joinTeamButton) {
    joinTeamButton.addEventListener('click', function() {
      notMember.style.animationPlayState = 'running';
      joinTeam.style.animationPlayState = "running";
  
      setTimeout(function () {
        notMember.style.display = 'none';
        joinTeam.style.display = 'flex';
      }, 200);
    });
  }
};
