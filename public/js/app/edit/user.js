window.onload = () => {
  const changeButton = document.querySelector('.change-password-button');
  const normalForm = document.querySelector('.form');
  const passwordForm = document.querySelector('.password-form');
  const exitButton = document.querySelector('.password-exit-button');

  changeButton.onclick = () => {
    normalForm.style.display = 'none';
    passwordForm.style.display = 'flex';
  }

  exitButton.onclick = () => {
    normalForm.style.display = 'flex';
    passwordForm.style.display = 'none';
  }
}
