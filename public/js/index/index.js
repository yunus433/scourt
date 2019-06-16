function responsiveDesign() {
  let ratio = window.innerWidth / 1920;
  const spans = document.getElementsByTagName('span');
  const inputs = document.getElementsByTagName('input');
  const atags = document.getElementsByTagName('a');

  if (ratio < 0.45) ratio = 0.45;

  for (let i = 0; i < spans.length; i++) {
    const fontSize = window.getComputedStyle(spans[i], null).getPropertyValue('font-size');
    const lineHeight = window.getComputedStyle(spans[i], null).getPropertyValue('line-height');
    if (fontSize) {
      spans[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
    };
    if (lineHeight) {
      spans[i].style.lineHeight = (parseFloat(lineHeight) * ratio) + "px";
    };
  };

  for (let i = 0; i < inputs.length; i++) {
    const fontSize = window.getComputedStyle(inputs[i], null).getPropertyValue('font-size');
    if (fontSize) {
      inputs[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
    };
  };

  for (let i = 0; i < atags.length; i++) {
    const fontSize = window.getComputedStyle(atags[i], null).getPropertyValue('font-size');
    if (fontSize) {
      atags[i].style.fontSize = (parseFloat(fontSize) * ratio) + "px";
    };
  };
}

window.onload = () => {
  responsiveDesign(document);
  const emailInput = document.querySelector('.form-email-input');
  const errorLineDefault = document.querySelector('.error-line-default-span');
  const errorLine = document.querySelector('.error-line-span');

  if (errorLine) setTimeout(() => {return errorLine.classList.remove("animation-class")}, 500) ;

  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    if (errorLine) errorLine.style.display = 'none';
    if (emailInput.value == "") {
      errorLineDefault.style.display = 'flex';
      errorLineDefault.classList.add("animation-class");
      setTimeout(() => {
        errorLineDefault.classList.remove("animation-class");
      }, 500);
    } else {
      errorLineDefault.style.display = 'none';
      document.querySelector('form').submit();
    }
  });
};
