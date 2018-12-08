window.onload = () => {
  const details = document.querySelector('.details-header');
  const videos = document.querySelector('.videos-header');

  const detailsWrapper = document.querySelector('.details');
  const videosWrapper = document.querySelector('.videos');

  document.addEventListener('click', (event) => {
    if (event.target) {
      if (event.target.closest('.details-header')) {
        detailsWrapper.style.display = 'block';
        videosWrapper.style.display = 'none';
        details.style.backgroundColor = 'rgb(212, 206, 206)';
        videos.style.backgroundColor = 'white';
      } else if (event.target.closest('.videos-header')) {
        detailsWrapper.style.display = 'none';
        videosWrapper.style.display = 'block';
        videos.style.backgroundColor = 'rgb(212, 206, 206)';
        details.style.backgroundColor = 'white';
      }
    }
  });
}

