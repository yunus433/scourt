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
  const order = document.querySelector('.league-order-header');
  const videos = document.querySelector('.all-videos-header');

  const matchesWrapper = document.querySelector('.matches');
  const orderWrapper = document.querySelector('.league-order');
  const videosWrapper = document.querySelector('.all-videos');

  matches.onclick = () => {
    console.log("Matches clicked");
    matchesWrapper.style.display = 'block';
    orderWrapper.style.display = 'none';
    videosWrapper.style.display = 'none';
    matches.style.backgroundColor = 'rgb(212, 206, 206)';
    order.style.backgroundColor = 'white';
    videos.style.backgroundColor = 'white';
  };
  order.onclick = () => {
    matchesWrapper.style.display = 'none';
    orderWrapper.style.display = 'block'
    videosWrapper.style.display = 'none';
    order.style.backgroundColor = 'rgb(212, 206, 206)';
    matches.style.backgroundColor = 'white';
    videos.style.backgroundColor = 'white';
  };
  videos.onclick = () => {
    matchesWrapper.style.display = 'none';
    orderWrapper.style.display = 'none';
    videosWrapper.style.display = 'block';
    videos.style.backgroundColor = 'rgb(212, 206, 206)';
    order.style.backgroundColor = 'white';
    matches.style.backgroundColor = 'white';
  };
}

