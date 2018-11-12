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
  
  const details = document.querySelector('.details-header');
  const videos = document.querySelector('.videos-header');

  const detailsWrapper = document.querySelector('.details');
  const videosWrapper = document.querySelector('.videos');

  details.onclick = () => {
    detailsWrapper.style.display = 'block';
    videosWrapper.style.display = 'none';
    details.style.backgroundColor = 'rgb(212, 206, 206)';
    videos.style.backgroundColor = 'white';
  }
  videos.onclick = () => {
    detailsWrapper.style.display = 'none';
    videosWrapper.style.display = 'block';
    videos.style.backgroundColor = 'rgb(212, 206, 206)';
    details.style.backgroundColor = 'white';
  }
 }

