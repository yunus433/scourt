window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const imageUpload = document.querySelector('.display-none');
  const form = document.querySelector('.form-left-side');

  imageUpload.onchange = () => {
    form.submit(); 
  };
};
