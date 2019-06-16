window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const form = document.querySelector('.all-wrapper');
  const input = document.getElementById('input');

  input.onchange = (event) => {
    form.submit();
  };
}
