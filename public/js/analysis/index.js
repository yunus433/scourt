window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const editMenu = document.querySelector('.user-edit-menu');

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == ('user-description') || event.target.parentNode.className == ('user-description') || event.target.className == ('user-edit-menu') || event.target.className == 'user-description-line' || event.target.parentNode.className == 'user-description-line') {
      editMenu.style.display = 'flex';
    } else {
      editMenu.style.display = 'none';
    }
  });
  
  const fileInput = document.querySelector('.video-upload-input');
  const fileForm = document.querySelector('.header-right-side');

  fileInput.onchange = () => {
    fileForm.submit();
  };
  
  document.addEventListener('click', (event) => {
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
  });
};
 

