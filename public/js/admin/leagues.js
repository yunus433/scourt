window.onload = () => {
  document.addEventListener('click', (event) => {
    if (event.target.parentNode.className.split(" ")[1] == "team-number") {
      if (event.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display == 'block') {
        event.target.parentNode.parentNode.parentNode.parentNode.children[2].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[3].style.display = 'none';
      } else {
        event.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display = 'block';
        event.target.parentNode.parentNode.parentNode.parentNode.children[2].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[3].style.display = 'none';
      }  
    } else if (event.target.parentNode.className.split(" ")[1] == "match-number") {
      if (event.target.parentNode.parentNode.parentNode.parentNode.children[2].style.display == 'block') {
        event.target.parentNode.parentNode.parentNode.parentNode.children[2].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[3].style.display = 'none';
      } else {
        event.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[2].style.display = 'block';
        event.target.parentNode.parentNode.parentNode.parentNode.children[3].style.display = 'none';
      }  
    } else if (event.target.parentNode.className.split(" ")[1] == "video-number") {
      if (event.target.parentNode.parentNode.parentNode.parentNode.children[3].style.display == 'block') {
        event.target.parentNode.parentNode.parentNode.parentNode.children[2].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[3].style.display = 'none';
      } else {
        event.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[2].style.display = 'none';
        event.target.parentNode.parentNode.parentNode.parentNode.children[3].style.display = 'block';
      }  
    }
  });
};
