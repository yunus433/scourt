window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);
    
  const errorLineSpan = document.querySelector('.error-line-span');

  if (errorLineSpan) setTimeout(() => {return errorLineSpan.classList.remove("animation-class")}, 500) ;

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
  });   

  const form = document.querySelector("form");

  form.onsubmit = (event) => {
    event.preventDefault();
    const email = document.querySelector('.email-input');
    const password = document.querySelector('.password-input');

    const errorLine = document.querySelector('.error-line');
    if (errorLine.childNodes[1]) errorLine.childNodes[1].style.display = 'none';
    const error = document.querySelector('.error-line-span-default');

    if (!email.value || !password.value) {
      error.style.display = 'block';
      error.classList.add('animation-class');
      setTimeout(() => {
        error.classList.remove("animation-class");
      }, 500);
    } else {
      error.style.display = 'none';
      form.submit();
    }
  }
};
