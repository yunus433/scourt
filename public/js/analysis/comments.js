function beautifulVideoTime (time) {
  let returnTime = "";
  timeParts = time.toString().split('.');
  if (parseInt(timeParts[0]) < 10)
    returnTime += "0" + timeParts[0];
  else 
    returnTime += timeParts[0];

  returnTime += ":"

  if (timeParts[1])
    returnTime += timeParts[1];
  else 
    returnTime += "00";

  return returnTime;
}

function createComment (comment) {
  const commentWrapper = document.querySelector('.comments-content');

  const eachComment = document.createElement('div');
  eachComment.classList.add('each-comment');

  const exactTimeInput = document.createElement('input');
  exactTimeInput.classList.add('display-none');
  exactTimeInput.value = comment.exactTime;
  eachComment.appendChild(exactTimeInput);

  const eachCommentHeader = document.createElement('div');
  eachCommentHeader.classList.add('each-comment-header');
  const headerSpan = document.createElement('span');
  headerSpan.innerHTML = "at " + comment.time
  eachCommentHeader.appendChild(headerSpan);
  eachComment.appendChild(eachCommentHeader);

  const eachCommentContent = document.createElement('div');
  eachCommentContent.classList.add('each-comment-content');
  const contentSpan = document.createElement('span');
  contentSpan.innerHTML = comment.content;
  eachCommentContent.appendChild(contentSpan);
  eachComment.appendChild(eachCommentContent);

  const eachCommentTaggedPlayers = document.createElement('div');
  eachCommentTaggedPlayers.classList.add('each-comment-tagged-players');

  const seeAllPlayersSpan = document.createElement('span');
  seeAllPlayersSpan.classList.add('see-all-players-button');
  eachCommentTaggedPlayers.appendChild(seeAllPlayersSpan);

  const taggedPlayersWrapper = document.createElement('div');
  taggedPlayersWrapper.classList.add('tagged-players-wrapper');
  comment.taggedPlayers.forEach(player => {
    const span = document.createElement('span');
    span.innerHTML = player;
    taggedPlayersWrapper.appendChild(span);
  });
  eachCommentTaggedPlayers.appendChild(taggedPlayersWrapper);
  
  eachComment.appendChild(eachCommentTaggedPlayers);

  commentWrapper.appendChild(eachComment);
  responsiveDesign(eachComment);
}

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

  const videoId = document.getElementById('video-id');

  const video = document.querySelector('.video');
  const videoDoneTimeSpan = document.querySelector('.video-done-time-span');

  video.oncanplay = () => {
    document.querySelector('.video-left-time-span').innerHTML = " " + beautifulVideoTime(Math.round(video.duration / 60 * 100) / 100);
  }

  let videoIsExpanded = false;
  let lastVolume = 1;

  document.addEventListener('click', (event) => {
    if (event.target.className == 'video') {
      if (video.paused) {
        video.play()
        document.querySelector('.start-icon').childNodes[0].classList.remove('fa-play');
        document.querySelector('.start-icon').childNodes[0].classList.add('fa-pause');
      } else {
        video.pause();
        document.querySelector('.start-icon').childNodes[0].classList.remove('fa-pause');
        document.querySelector('.start-icon').childNodes[0].classList.add('fa-play');
      }
    }

    if (event.target.parentNode.className == 'start-icon') {
      if (event.target.classList.contains('fa-play')) {
        video.play();
        event.target.classList.remove('fa-play');
        event.target.classList.add('fa-pause');
      } else {
        video.pause();
        event.target.classList.remove('fa-pause');
        event.target.classList.add('fa-play');
      }
    }

    if (event.target.parentNode.className == 'video-time-bar' || event.target.className == 'video-time-bar') {
      if (videoIsExpanded) {
        document.querySelector('.video-done-time').style.width = (event.clientX - 2.5) + "px";
        video.currentTime = ((event.clientX - 2.5) * video.duration) / (window.innerWidth * 0.7);
      } else {
        document.querySelector('.video-done-time').style.width = (event.clientX - (window.innerWidth * 0.05) - 2.5) + "px";
        video.currentTime = ((event.clientX - (window.innerWidth * 0.05) - 2.5) * video.duration) / (window.innerWidth * 0.4);
      }
    }

    if (event.target.parentNode.className == 'voice-icon' && event.target.classList.contains('fas')) {
      if (event.target.classList.contains('fa-volume-down')) {
        lastVolume = video.volume;
        video.volume = 0;
        document.querySelector('.voice-selected-bar').style.width = "0px";
        event.target.classList.remove('fa-volume-down');
        event.target.classList.add('fa-volume-off');
      } else {
        video.volume = lastVolume;
        document.querySelector('.voice-selected-bar').style.width = (lastVolume * 50) + "px";
        event.target.classList.remove('fa-volume-off');
        event.target.classList.add('fa-volume-down');
      }
    } 

    if (event.target.className == 'voice-bar' || event.target.parentNode.className == 'voice-bar') {
      const muteVoice = document.getElementsByClassName('fa-volume-off')[0];
      if (muteVoice) {
        muteVoice.classList.remove('fa-volume-off');
        muteVoice.classList.add('fa-volume-down');
      }
      document.querySelector('.voice-selected-bar').style.width = (event.clientX - document.querySelector('.voice-bar').getBoundingClientRect().left - 3.5) + "px";
      video.volume = (event.clientX - document.querySelector('.voice-bar').getBoundingClientRect().left - 3.5) / 50;
      lastVolume = (event.clientX - document.querySelector('.voice-bar').getBoundingClientRect().left - 3.5) / 50;
    }

    if (event.target.parentNode.className == 'expand-icon') {
      if (event.target.classList.contains('fa-expand')) {
        videoIsExpanded = true;

        const leftSideWrapper = document.querySelector('.left-side-wrapper');
        const rightSideWrapper = document.querySelector('.right-side-wrapper');
        const commentsWrapper = document.querySelector('.video-comments-wrapper');
  
        document.querySelector('.all-content').style.position = 'absolute';
        document.querySelector('.all-content').style.height = '100vh';
        document.querySelector('.all-content').style.zIndex = '100';
        document.querySelector('.all-content').style.top = '0px';
  
        leftSideWrapper.style.height  = '100vh';
        leftSideWrapper.style.width = '70vw';
        leftSideWrapper.style.flex = 'initial';
        leftSideWrapper.style.background = 'white';
  
        video.style.width = '100%';
        video.style.height = '100%';
        document.querySelector('.video-bar').style.width = '100%';
        document.querySelector('.video-bar').style.transform = 'translateY(0%)';
        document.querySelector('.video-name').style.display = 'none';
  
        rightSideWrapper.style.height  = '100vh';
        rightSideWrapper.style.width = '30vw';
        rightSideWrapper.style.flex = 'initial';
        rightSideWrapper.style.background = 'white';
  
        commentsWrapper.style.width = '100%';
        commentsWrapper.style.height = '100%';
        commentsWrapper.style.borderRadius = '0px';
  
        event.target.classList.remove('fa-expand');
        event.target.classList.add('fa-compress');
      } else {
        videoIsExpanded = false;

        const leftSideWrapper = document.querySelector('.left-side-wrapper');
        const rightSideWrapper = document.querySelector('.right-side-wrapper');
        const commentsWrapper = document.querySelector('.video-comments-wrapper');
  
        document.querySelector('.all-content').style.position = 'block';
        document.querySelector('.all-content').style.height = '93vh';
        document.querySelector('.all-content').style.zIndex = '1';
        document.querySelector('.all-content').style.top = '7vh';
  
        leftSideWrapper.style.height  = '100%';
        leftSideWrapper.style.width = 'initial';
        leftSideWrapper.style.flex = '1';
        leftSideWrapper.style.background = 'initial';
  
        video.style.width = '80%';
        video.style.height = 'initial';
        document.querySelector('.video-bar').style.width = '80%';
        document.querySelector('.video-bar').style.transform = 'translateY(-100%)';
        document.querySelector('.video-name').style.display = 'block';
  
        rightSideWrapper.style.height  = '100%';
        rightSideWrapper.style.width = 'initial';
        rightSideWrapper.style.flex = '1';
        rightSideWrapper.style.background = 'initial';
  
        commentsWrapper.style.width = '80%';
        commentsWrapper.style.height = '80%';
        commentsWrapper.style.borderRadius = '79px';
  
        event.target.classList.remove('fa-compress');
        event.target.classList.add('fa-expand');
      }
    }

    if (event.target.className == 'add-new-button' || event.target.parentNode.className == 'add-new-button') {
      document.querySelector('.add-new-comment-wrapper').style.display = 'flex';
      document.querySelector('span.new-comment-time').innerHTML = "at " + beautifulVideoTime(Math.round(video.currentTime / 6 * 10) / 100);
      document.getElementById('comment-time-input').value = beautifulVideoTime(Math.round(video.currentTime / 6 * 10) / 100);
      document.getElementById('comment-exact-time-input').value = video.currentTime;
    }

    if (event.target.className == 'close-comment-button' || event.target.parentNode.className == 'close-comment-button') {
      document.querySelector('.add-new-comment-wrapper').style.display = 'none';
    }

    if (event.target.className == 'see-all-players-button') {
      event.target.parentNode.childNodes[1].style.display = 'flex';
    }

    if (event.target.className == 'tag-player-button' || event.target.parentNode.className == 'tag-player-button') {
      document.querySelector('.tag-players-wrapper').style.display = 'flex';
    }

    if (event.target.className == 'send-comment-button' || event.target.parentNode.className == 'send-comment-button') {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/analysis/comment`);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      const taggedPlayers = [];
      const taggedPlayersList = document.querySelector('.tag-players-wrapper').childNodes;

      for (let i = 1; i < taggedPlayersList.length; i++) {
        if (taggedPlayersList[i].childNodes[0] && taggedPlayersList[i].childNodes[0].checked)
          taggedPlayers.push(taggedPlayersList[i].childNodes[0].value);
      }

      const comment = {
        time: document.getElementById('comment-time-input').value,
        exactTime: document.getElementById('comment-exact-time-input').value,
        content: document.querySelector('.new-comment-content').value,
        taggedPlayers,
        id: videoId.innerHTML
      }

      xhr.send(JSON.stringify(comment));

      createComment(comment);
    }
  });

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == 'voice-icon' || event.target.parentNode.className == 'voice-icon' || event.target.parentNode.parentNode.className == 'voice-icon') {
      document.querySelector('.voice-bar').style.display = 'flex';
    } else {
      document.querySelector('.voice-bar').style.display = 'none';
    }
  });

  video.ontimeupdate = () => {
    if (videoIsExpanded) {
      document.querySelector('.video-done-time').style.width =  ((window.innerWidth * 0.7 * video.currentTime) / video.duration) + "px";
    } else {
      document.querySelector('.video-done-time').style.width =  ((window.innerWidth * 0.4 * video.currentTime) / video.duration) + "px";
    }

    if (Math.round(video.currentTime / 60 * 100) / 100) 
      videoDoneTimeSpan.innerHTML = beautifulVideoTime(Math.round(video.currentTime / 60 * 100) / 100) + " /";
    else
      videoDoneTimeSpan.innerHTML = "00:00 /"
  };

  video.onended = () => {
    document.querySelector('.start-icon').childNodes[0].classList.remove('fa-pause');
    document.querySelector('.start-icon').childNodes[0].classList.add('fa-play');
  }
  
  // document.addEventListener('click', (event) => {
  //     document.querySelector('.tagged-players-span').innerHTML = "Currently 0 tagged players to this comment";
  //   } else if (event.target.closest('.players-list-send-button')) {
  //     const inputs = document.querySelectorAll('.each-player-input');

  //     document.querySelector('.form-players-list').style.display = 'none';
  //     document.querySelector('.form-header-part').style.display = 'flex';
  //     document.querySelector('.form-footer-part').style.display = 'block';
  //     document.querySelector('.comment-content-input').style.display = 'block';

  //     let number = 0;
  //     inputs.forEach(input => {
  //       if (input.checked) {
  //         number++;
  //       };
  //     });
  //     document.querySelector('.tagged-players-span').innerHTML = "Currently " + number + " tagged players to this comment";
  //   } else if (event.target.closest('.go-to-comment-button i')) {
  //     document.querySelector('.video').currentTime = Math.floor(event.target.parentNode.parentNode.children[1].innerHTML);
  //   }
  // });
  // document.querySelector('.video').ontimeupdate = () => {
  //   const comments = document.querySelectorAll('.each-comment-value');

  //   comments.forEach(comment => {
  //     comment.parentNode.classList.remove('current-comment');
      
  //     if (Math.floor(comment.innerHTML) == Math.floor(document.querySelector('.video').currentTime)) {
  //       comment.parentNode.classList.add('current-comment');
  //       comment.parentNode.scrollIntoView();
  //     }
  //   });
  // };
};
