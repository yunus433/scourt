window.onload = () => {
  const changeButton = document.querySelector('.change-password-button');
  const normalForm = document.querySelector('.form');
  const passwordForm = document.querySelector('.password-form');
  const exitButton = document.querySelector('.password-exit-button');
  const imageUpload = document.querySelector('.profile-input');
  const form = document.querySelector('.form-left-side');

  changeButton.addEventListener('click', () => {
    normalForm.style.display = 'none';
    passwordForm.style.display = 'flex';
  });

  exitButton.addEventListener('click', () => {
    normalForm.style.display = 'flex';
    passwordForm.style.display = 'none';
  });

  imageUpload.onchange = (event) => {
    form.submit(); 
  };
};
