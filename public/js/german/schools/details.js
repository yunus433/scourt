window.onload = () => {
  const matches = document.querySelectorAll('.matches-header');
  const players = document.querySelectorAll('.players-header');

  const matchesWrapper = document.querySelectorAll('.details-matches');
  const playersWrapper = document.querySelectorAll('.details-players');

  matches[0].onclick = () => {
    matchesWrapper[0].style.display = 'block';
    playersWrapper[0].style.display = 'none';
    matches[0].style.backgroundColor = 'rgb(212, 206, 206)';
    players[0].style.backgroundColor = 'white';
  }
  players[0].onclick = () => {
    matchesWrapper[0].style.display = 'none';
    playersWrapper[0].style.display = 'block';
    players[0].style.backgroundColor = 'rgb(212, 206, 206)';
    matches[0].style.backgroundColor = 'white';
  }

  matches[1].onclick = () => {
    matchesWrapper[1].style.display = 'block';
    playersWrapper[1].style.display = 'none';
    matches[1].style.backgroundColor = 'rgb(212, 206, 206)';
    players[1].style.backgroundColor = 'white';
  }
  players[1].onclick = () => {
    matchesWrapper[1].style.display = 'none';
    playersWrapper[1].style.display = 'block';
    players[1].style.backgroundColor = 'rgb(212, 206, 206)';
    matches[1].style.backgroundColor = 'white';
  }
 }
