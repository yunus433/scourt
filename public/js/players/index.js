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

  const allContentMain = document.querySelector('.all-content-main');
  const allContentMainForm = document.querySelector('.all-content-main-form');

  document.addEventListener('click', (event) => {
    if (event.target.className == 'edit-team-button' || event.target.parentNode.className == 'edit-team-button') {
      allContentMain.style.display = 'none';
      allContentMainForm.style.display = 'flex';
    }
  })
};
