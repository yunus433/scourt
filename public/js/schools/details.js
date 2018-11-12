window.onload = () => {
  const language = document.querySelector(".language-choices");
  const languageEnglish = document.querySelector(".language-choices-english");
  const turkish = document.querySelector(".header-content");
  const english = document.querySelector(".header-content-english");
  const turkishFooter = document.querySelector(".footer");
  const englishFooter = document.querySelector(".footer-english"); 
  const content = document.querySelector(".all-content");
  const englishContent = document.querySelector(".all-content-english"); 
  const rode = document.querySelector(".rode");
  const englishRode = document.querySelector(".rode-english"); 

  language.onclick = () => {
    turkish.style.display = 'none';
    english.style.display = 'flex';
    turkishFooter.style.display = 'none';
    englishFooter.style.display = 'flex';
    content.style.display = 'none';
    englishContent.style.display = 'block';
    rode.style.display = 'none';
    englishRode.style.display = 'block';
  };
  languageEnglish.onclick = () => {
    turkish.style.display = 'flex';
    english.style.display = 'none';
    turkishFooter.style.display = 'flex';
    englishFooter.style.display = 'none';
    content.style.display = 'block';
    englishContent.style.display = 'none';
    rode.style.display = 'block';
    englishRode.style.display = 'none';
  };
  
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
