window.onload = () => {
  const matches = document.querySelector('.matches-header');
  const players = document.querySelector('.players-header');

  const matchesWrapper = document.querySelector('.details-matches');
  const playersWrapper = document.querySelector('.details-players');

  matches.onclick = () => {
    matchesWrapper.style.display = 'block';
    playersWrapper.style.display = 'none';
    matches.style.backgroundColor = 'rgb(212, 206, 206)';
    players.style.backgroundColor = 'white';
  }
  players.onclick = () => {
    matchesWrapper.style.display = 'none';
    playersWrapper.style.display = 'block';
    players.style.backgroundColor = 'rgb(212, 206, 206)';
    matches.style.backgroundColor = 'white';
  }
 }
