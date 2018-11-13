window.onload = () => {
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

