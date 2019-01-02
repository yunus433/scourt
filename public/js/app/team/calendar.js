window.onload = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.add-new-button')) {
      const buttonPlus = document.querySelector('.add-new-button-i');
      const newEventWrapper = document.querySelector('.calendar-adding-new-event-wrapper');
      const allWrapper = document.querySelector('.all-wrapper');

      buttonPlus.style.transform = 'rotate(-90deg)';
      newEventWrapper.style.display = 'block';
      allWrapper.style.opacity = '0.9';
    }
    else if (event.target.closest('.calendar-form-back-button')) {
      const buttonPlus = document.querySelector('.add-new-button-i');
      const newEventWrapper = document.querySelector('.calendar-adding-new-event-wrapper');
      const allWrapper = document.querySelector('.all-wrapper');

      buttonPlus.style.transform = 'none';
      newEventWrapper.style.display = 'none';
      allWrapper.style.opacity = '1';
    }
    else if (event.target.closest('.calendar-before-button')) {
      const twoBeforeArrow = document.querySelector('.calendar-two-before-arrow');
      const beforeArrow = document.querySelector('.calendar-before-arrow');
      const afterBeforeArrow = document.querySelector('.calendar-after-before-arrow');
      const afterArrow = document.querySelector('.calendar-after-arrow');

      const beforeMainBox = document.querySelector('.calendar-before-main-box');
      const mainBox = document.querySelector('.calendar-main-box');

      twoBeforeArrow.style.display = 'flex';
      beforeArrow.style.display = 'none';
      afterBeforeArrow.style.display = 'flex';
      afterArrow.style.display = 'none';

      beforeMainBox.style.display = 'grid';
      mainBox.style.display = 'none';
    }
    else if (event.target.closest('.calendar-after-before-button')) {
      const twoBeforeArrow = document.querySelector('.calendar-two-before-arrow');
      const beforeArrow = document.querySelector('.calendar-before-arrow');
      const afterBeforeArrow = document.querySelector('.calendar-after-before-arrow');
      const afterArrow = document.querySelector('.calendar-after-arrow');

      const beforeMainBox = document.querySelector('.calendar-before-main-box');
      const mainBox = document.querySelector('.calendar-main-box');

      twoBeforeArrow.style.display = 'none';
      beforeArrow.style.display = 'flex';
      afterBeforeArrow.style.display = 'none';
      afterArrow.style.display = 'flex';

      beforeMainBox.style.display = 'none';
      mainBox.style.display = 'grid';
    }
    else if (event.target.closest('.calendar-after-button')) {
      const twoAfterArrow = document.querySelector('.calendar-two-after-arrow');
      const beforeArrow = document.querySelector('.calendar-before-arrow');
      const afterBeforeArrow = document.querySelector('.calendar-before-after-arrow');
      const afterArrow = document.querySelector('.calendar-after-arrow');

      const afterMainBox = document.querySelector('.calendar-after-main-box');
      const mainBox = document.querySelector('.calendar-main-box');

      twoAfterArrow.style.display = 'flex';
      beforeArrow.style.display = 'none';
      afterBeforeArrow.style.display = 'flex';
      afterArrow.style.display = 'none';

      afterMainBox.style.display = 'grid';
      mainBox.style.display = 'none';
    }
    else if (event.target.closest('.calendar-before-after-button')) {
      const twoAfterArrow = document.querySelector('.calendar-two-after-arrow');
      const beforeArrow = document.querySelector('.calendar-before-arrow');
      const afterBeforeArrow = document.querySelector('.calendar-before-after-arrow');
      const afterArrow = document.querySelector('.calendar-after-arrow');

      const afterMainBox = document.querySelector('.calendar-after-main-box');
      const mainBox = document.querySelector('.calendar-main-box');

      twoAfterArrow.style.display = 'none';
      beforeArrow.style.display = 'flex';
      afterBeforeArrow.style.display = 'none';
      afterArrow.style.display = 'flex';

      afterMainBox.style.display = 'none';
      mainBox.style.display = 'grid';
    }
  });
}
