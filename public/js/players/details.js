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
  
  const details = document.querySelectorAll('.details-header');
  const videos = document.querySelectorAll('.videos-header');

  const detailsWrapper = document.querySelectorAll('.details');
  const videosWrapper = document.querySelectorAll('.videos');

  details[0].onclick = () => {
    detailsWrapper[0].style.display = 'block';
    videosWrapper[0].style.display = 'none';
    details[0].style.backgroundColor = 'rgb(212, 206, 206)';
    videos[0].style.backgroundColor = 'white';
  }
  videos[0].onclick = () => {
    detailsWrapper[0].style.display = 'none';
    videosWrapper[0].style.display = 'block';
    videos[0].style.backgroundColor = 'rgb(212, 206, 206)';
    details[0].style.backgroundColor = 'white';
  }

  details[1].onclick = () => {
    detailsWrapper[1].style.display = 'block';
    videosWrapper[1].style.display = 'none';
    details[1].style.backgroundColor = 'rgb(212, 206, 206)';
    videos[1].style.backgroundColor = 'white';
  }
  videos[1].onclick = () => {
    detailsWrapper[1].style.display = 'none';
    videosWrapper[1].style.display = 'block';
    videos[1].style.backgroundColor = 'rgb(212, 206, 206)';
    details[1].style.backgroundColor = 'white';
  }
 }

