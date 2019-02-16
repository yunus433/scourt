window.onload = () => {
  const contentSideHeader = document.querySelector('.content-side-header');
  document.addEventListener('click', (event) => {
    if (event.target.className == 'content-side-header-open-button' || event.target.parentNode.className == 'content-side-header-open-button') { 
      contentSideHeader.style.display = 'flex'; 
    } else {
      contentSideHeader.style.display = 'none'; 
    }
  });

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

  document.addEventListener('click', (event) => {
    if (event.target.closest('.add-new-training-button')) {
      const buttonPlus = document.querySelector('.add-new-training-button-i');
      const newEventWrapper = document.querySelector('.add-new-training-wrapper');
      const allWrapper = document.querySelector('.all-wrapper');

      buttonPlus.style.transform = 'rotate(-90deg)';
      newEventWrapper.style.display = 'block';
      allWrapper.style.opacity = '0.9';
    }
    else if (event.target.closest('.exit-add-new-button')) {
      const buttonPlus = document.querySelector('.add-new-training-button-i');
      const newEventWrapper = document.querySelector('.add-new-training-wrapper');
      const allWrapper = document.querySelector('.all-wrapper');

      buttonPlus.style.transform = 'none';
      newEventWrapper.style.display = 'none';
      allWrapper.style.opacity = '1';
    }
    else if (event.target.closest('.each-training-show-more-button')) {
      event.target.parentNode.parentNode.parentNode.childNodes[1].style.display = 'flex';
      event.target.parentNode.childNodes[1].style.display = 'none';
      event.target.parentNode.childNodes[2].style.display = 'block';
    }
    else if (event.target.closest('.each-training-show-less-button')) {
      event.target.parentNode.parentNode.parentNode.childNodes[1].style.display = 'none';
      event.target.parentNode.childNodes[1].style.display = 'block';
      event.target.parentNode.childNodes[2].style.display = 'none';
    }
  });
}
