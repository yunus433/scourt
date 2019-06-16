window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const defaultPassword = document.querySelector('.wrong-password-error');
  if (defaultPassword)
    setTimeout(() => {
      defaultPassword.classList.remove('animation-class');
    }, 500);

  document.addEventListener('click', (event) => {
    if (event.target.className == 'see-password-button far fa-eye' && event.target.parentNode.childNodes[0].value) {
      event.target.parentNode.childNodes[0].type = 'text';
      event.target.classList.remove('far');
      event.target.classList.remove('fa-eye');
      event.target.classList.add('fas');
      event.target.classList.add('fa-eye-slash');
    } else if (event.target.className == 'see-password-button fas fa-eye-slash') {
      event.target.parentNode.childNodes[0].type = 'password';
      event.target.classList.remove('fas');
      event.target.classList.remove('fa-eye-slash');
      event.target.classList.add('far');
      event.target.classList.add('fa-eye');
    }
  
    if (event.target.className == 'form-send-button') {
      const passwordOld = document.querySelector('.password-input-old');
      const password1 = document.querySelector('.password-input-one');
      const password2 = document.querySelector('.password-input-two');
  
      const error1 = document.querySelector('.no-password-error');
      const error2 = document.querySelector('.confirm-password-error');
      const error3 = document.querySelector('.short-password-error');
  
      if (!password1.value || !password2.value | !passwordOld.value) {
        error2.style.display = 'none';
        error3.style.display = 'none';
        error1.style.display = 'block';
        error1.classList.add('animation-class');
        setTimeout(() => {
          error1.classList.remove("animation-class");
        }, 500);
      } else if (password1.value != password2.value) {
        error1.style.display = 'none';
        error3.style.display = 'none';
        error2.style.display = 'block';
        error2.classList.add('animation-class');
        setTimeout(() => {
          error2.classList.remove("animation-class");
        }, 500);
      } else if (password1.value.length <= 5) {
        error1.style.display = 'none';
        error2.style.display = 'none';
        error3.style.display = 'block';
        error3.classList.add('animation-class');
        setTimeout(() => {
          error3.classList.remove("animation-class");
        }, 500);
      } else {
        document.querySelector("form").submit();
      }
    }
  }); 
}
