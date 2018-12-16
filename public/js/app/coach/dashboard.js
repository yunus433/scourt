window.onload = () => {
  const joinTeamButton = document.querySelector('.join-team-button');
  const exitCreateTeam = document.querySelector('.exit-create-team');
  const notMember = document.querySelector('.content-right-not-member');
  const joinTeam = document.querySelector('.content-right-join-team');

  if (joinTeamButton) {
    joinTeamButton.onclick = () => {
      notMember.style.animationPlayState = 'running';
      joinTeam.style.animationPlayState = "running";
  
      setTimeout(function () {
        notMember.style.display = 'none';
        joinTeam.style.display = 'flex';
      }, 200);
    };
  }

  if (exitCreateTeam) {
    exitCreateTeam.onclick = () => {
      notMember.style.animationPlayState = 'running';
      joinTeam.style.animationPlayState = "running";
  
      setTimeout(function () {
        notMember.style.display = 'flex';
        joinTeam.style.display = 'none';
      }, 200);
    };
  }
};
