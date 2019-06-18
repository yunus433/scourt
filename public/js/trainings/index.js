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

  const newTrainingWrapper = document.querySelector('.add-new-training-wrapper');
  const trainingsWrapper = document.querySelector('.trainings-wrapper');

  document.addEventListener('click', (event) => {

    // training add new training form button
    if (event.target.className == 'add-new-training-button' || event.target.parentNode.className == 'add-new-training-button') {
      newTrainingWrapper.classList.remove('move-down-animation-class');
      trainingsWrapper.classList.remove('opacity-increase-animation-class');
      newTrainingWrapper.style.display = 'flex';
      trainingsWrapper.classList.add('opacity-decrease-animation-class');
      newTrainingWrapper.classList.add('move-up-animation-class');
    }

    if (event.target.id == 'form-close-button' || event.target.parentNode.id == 'form-close-button') {
      newTrainingWrapper.classList.remove('move-up-animation-class');
      trainingsWrapper.classList.remove('opacity-decrease-animation-class');
      newTrainingWrapper.classList.add('move-down-animation-class');
      trainingsWrapper.classList.add('opacity-increase-animation-class');
    }

    // training open content listeners
    if (event.target.className == 'training-models-wrapper' || event.target.className == 'coming-trainings-wrapper' || event.target.className == 'old-trainings-wrapper') {
      if (event.target.childNodes[1].style.display == 'none') {
        event.target.childNodes[1].style.display = 'flex';
        event.target.style.border = "1px solid rgb(171, 171, 171)";
      } else {
        event.target.childNodes[1].style.display = 'none';
        event.target.style.border = "1px solid rgb(217, 217, 217)";
      }
    }
    if (event.target.parentNode.className == 'training-models-wrapper' || event.target.parentNode.className == 'coming-trainings-wrapper' || event.target.parentNode.className == 'old-trainings-wrapper') {
      if (event.target.parentNode.childNodes[1].style.display == 'none') {
        event.target.parentNode.childNodes[1].style.display = 'flex';
        event.target.parentNode.style.border = "1px solid rgb(171, 171, 171)";
      } else {
        event.target.parentNode.childNodes[1].style.display = 'none';
        event.target.parentNode.style.border = "1px solid rgb(217, 217, 217)";
      }
    }
    if (event.target.parentNode.parentNode.className == 'training-models-wrapper' || event.target.parentNode.parentNode.className == 'coming-trainings-wrapper' || event.target.parentNode.parentNode.className == 'old-trainings-wrapper') {
      if (event.target.parentNode.parentNode.childNodes[1].style.display == 'none') {
        event.target.parentNode.parentNode.childNodes[1].style.display = 'flex';
        event.target.parentNode.parentNode.style.border = "1px solid rgb(171, 171, 171)";
      } else {
        event.target.parentNode.parentNode.childNodes[1].style.display = 'none';
        event.target.parentNode.parentNode.style.border = "1px solid rgb(217, 217, 217)";
      }
    }
  });
}
