window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  document.addEventListener('click', (event) => {
    if (event.target.className == 'form-send-button') {
      const nameInput = document.querySelector('.name-input');
      const surnameInput = document.querySelector('.surname-input');
      const dateInput = document.querySelector('.date-input');
      const emailInput = document.querySelector('.email-input');
      const passwordInput = document.querySelector('.password-input');

      const error1 = document.querySelector('.no-input-error');
      const error2 = document.querySelector('.not-valid-date-error');
      const error3 = document.querySelector('.short-password-error');
      const error4 = document.querySelector('.not-valid-email-error');
      const error5 = document.querySelector('.already-taken-email');

      if (dateInput) {
        if (!nameInput.value || !surnameInput.value || !dateInput.value) {

          error2.style.display = 'none';
          error3.style.display = 'none';
          error1.style.display = 'block';
          error4.style.display = 'none';
          error5.style.display = 'none';
          error1.classList.add('animation-class');
          setTimeout(() => {
            error1.classList.remove("animation-class");
          }, 500);

        } else if (Object.prototype.toString.call(dateInput.value) === "[object Date]") {

          error1.style.display = 'none';
          error2.style.display = 'block';
          error2.classList.add('animation-class');
          error4.style.display = 'none';
          error5.style.display = 'none';
          setTimeout(() => {
            error2.classList.remove("animation-class");
          }, 500);

        } else {
          document.querySelector("form").submit();
        }
      }

      if (passwordInput && emailInput) {
        if (!nameInput.value || !surnameInput.value || !passwordInput.value || !emailInput) {

          error2.style.display = 'none';
          error3.style.display = 'none';
          error1.style.display = 'block';
          error4.style.display = 'none';
          error5.style.display = 'none';
          error1.classList.add('animation-class');
          setTimeout(() => {
            error1.classList.remove("animation-class");
          }, 500);

        } else if (passwordInput.value.length < 6) {

          error1.style.display = 'none';
          error2.style.display = 'none';
          error3.style.display = 'block';
          error4.style.display = 'none';
          error5.style.display = 'none';
          error3.classList.add('animation-class');
          setTimeout(() => {
            error3.classList.remove("animation-class");
          }, 500);

        } else {
          document.querySelector("form").submit();
        }
      }
    }
  }); 
}
