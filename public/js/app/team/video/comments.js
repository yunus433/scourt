window.onload = () => {
  let contentSideHeader = document.querySelector('.content-side-header');
  document.addEventListener('click', (event) => {
    if (event.target.className == 'content-side-header-open-button' || event.target.parentNode.className == 'content-side-header-open-button') { 
      contentSideHeader.style.display = 'flex'; 
    } else {
      contentSideHeader.style.display = 'none'; 
    }
  })
  
  document.querySelector('.video').play();
  document.addEventListener('click', (event) => {
    if (event.target.closest('.add-new-button')) {
      document.querySelector('.new-comment-form').style.display = 'flex';
      const time = document.querySelector('.video').currentTime;
      document.querySelector('.time-at-span').innerHTML = "at " + Math.floor(time / 60) + ":" + Math.floor(time % 60);
      document.querySelector('.time-at-input').value = time;
      document.querySelector('.video').pause();
    } else if (event.target.closest('.form-close-button')) {
      document.querySelector('.new-comment-form').style.display = 'none';
      document.querySelector('.video').play();
    } else if (event.target.closest('.tag-one-button')) {
      document.querySelector('.form-players-list').style.display = 'block';
      document.querySelector('.form-header-part').style.display = 'none';
      document.querySelector('.form-footer-part').style.display = 'none';
      document.querySelector('.comment-content-input').style.display = 'none';
    } else if (event.target.closest('.players-list-close-button')) {
      const inputs = document.querySelectorAll('.each-player-input');

      document.querySelector('.form-players-list').style.display = 'none';
      document.querySelector('.form-header-part').style.display = 'flex';
      document.querySelector('.form-footer-part').style.display = 'block';
      document.querySelector('.comment-content-input').style.display = 'block';

      inputs.forEach(input => {
        input.checked = false;
      });
      document.querySelector('.tagged-players-span').innerHTML = "Currently 0 tagged players to this comment";
    } else if (event.target.closest('.players-list-send-button')) {
      const inputs = document.querySelectorAll('.each-player-input');

      document.querySelector('.form-players-list').style.display = 'none';
      document.querySelector('.form-header-part').style.display = 'flex';
      document.querySelector('.form-footer-part').style.display = 'block';
      document.querySelector('.comment-content-input').style.display = 'block';

      let number = 0;
      inputs.forEach(input => {
        if (input.checked) {
          number++;
        };
      });
      document.querySelector('.tagged-players-span').innerHTML = "Currently " + number + " tagged players to this comment";
    } else if (event.target.closest('.go-to-comment-button i')) {
      document.querySelector('.video').currentTime = Math.floor(event.target.parentNode.parentNode.children[1].innerHTML);
    }
  });
  document.querySelector('.video').ontimeupdate = () => {
    const comments = document.querySelectorAll('.each-comment-value');

    comments.forEach(comment => {
      comment.parentNode.classList.remove('current-comment');
      
      if (Math.floor(comment.innerHTML) == Math.floor(document.querySelector('.video').currentTime)) {
        comment.parentNode.classList.add('current-comment');
        comment.parentNode.scrollIntoView();
      }
    });
  };

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
  })
};
