window.onload = () => {
  const imageUpload = document.querySelector('.profile-input');
  const form = document.querySelector('.form-left-side');

  imageUpload.onchange = (event) => {
    console.log('submitted');
    form.submit(); 
  }
}
