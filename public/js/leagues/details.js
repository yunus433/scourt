 window.onload = () => {
  const matches = document.querySelector('.matches-header');
  const order = document.querySelector('.league-order-header');
  const videos = document.querySelector('.all-videos-header');

  const matchesWrapper = document.querySelector('.matches');
  const orderWrapper = document.querySelector('.league-order');
  const videosWrapper = document.querySelector('.all-videos');

  matches.onclick = () => {
    matchesWrapper.style.display = 'block';
    orderWrapper.style.display = 'none';
    videosWrapper.style.display = 'none';
    matches.style.backgroundColor = 'rgb(212, 206, 206)';
    order.style.backgroundColor = 'white';
    videos.style.backgroundColor = 'white';
  }
  order.onclick = () => {
    matchesWrapper.style.display = 'none';
    orderWrapper.style.display = 'block'
    videosWrapper.style.display = 'none';
    order.style.backgroundColor = 'rgb(212, 206, 206)';
    matches.style.backgroundColor = 'white';
    videos.style.backgroundColor = 'white';
  }
  videos.onclick = () => {
    matchesWrapper.style.display = 'none';
    orderWrapper.style.display = 'none';
    videosWrapper.style.display = 'block';
    videos.style.backgroundColor = 'rgb(212, 206, 206)';
    order.style.backgroundColor = 'white';
    matches.style.backgroundColor = 'white';
  }
 }

