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
