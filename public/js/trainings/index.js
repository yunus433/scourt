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
  });
}
