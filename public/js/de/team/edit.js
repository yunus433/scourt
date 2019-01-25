window.onload = () => {
  const imageUpload = document.querySelector('.team-picture-input');
  const form = document.querySelector('.team-left-side');

  imageUpload.onchange = (event) => {
    form.submit(); 
  }
}
