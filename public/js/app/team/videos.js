window.onload = () => {
  let contentSideHeader = document.querySelector('.content-side-header');
  document.addEventListener('click', (event) => {
    if (event.target.className == 'content-side-header-open-button' || event.target.parentNode.className == 'content-side-header-open-button') { 
      contentSideHeader.style.display = 'flex'; 
    } else {
      contentSideHeader.style.display = 'none'; 
    }
  })
  
  document.onclick = (event) => {
    if (event.target.closest(".video-name-change")) {
      const videoNameArr = document.querySelectorAll(".video-name");
      const videoInputArr = document.querySelectorAll(".video-name-input");

      videoNameArr.forEach(video => {
        video.style.display = 'block';
      });
      videoInputArr.forEach(video => {
        video.style.display = 'none';
      });
      
      event.target.closest(".video-name-change").parentNode.childNodes[1].style.display = 'none';
      event.target.closest(".video-name-change").parentNode.childNodes[0].style.display = 'block';
      event.target.closest(".video-name-change").parentNode.childNodes[0].select();
    } else if (!event.target.closest(".video-name-change") && !event.target.closest(".video-name-input")) {
      const videoNameArr = document.querySelectorAll(".video-name");
      const videoInputArr = document.querySelectorAll(".video-name-input");

      videoNameArr.forEach(video => {
        video.style.display = 'block';
      });
      videoInputArr.forEach(video => {
        video.style.display = 'none';
      });
    }
  }

  const userDescriptionLines = document.querySelectorAll('.user-description-line');
  document.addEventListener('click', (event) => {
    if (event.target.className == 'user-description' || event.target.parentNode.className == 'user-description-line-first') { 
      userDescriptionLines[0].style.display = 'flex'; 
      userDescriptionLines[1].style.display = 'flex'; 
      userDescriptionLines[2].style.display = 'flex'; 
    } else {
      userDescriptionLines[0].style.display = 'none'; 
      userDescriptionLines[1].style.display = 'none'; 
      userDescriptionLines[2].style.display = 'none'; 
    }
  });
};
