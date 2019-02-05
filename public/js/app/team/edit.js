window.onload = () => {
  const imageUpload = document.querySelector('.team-picture-input');
  const form = document.querySelector('.team-left-side');

  imageUpload.onchange = (event) => {
    form.submit(); 
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
  })
}
