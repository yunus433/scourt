window.onload = () => { 
  const nameForm = document.getElementById('name-form');
  const schoolForm = document.getElementById('school-form');
  const names = document.querySelectorAll('.name');
  const schools = document.querySelectorAll('.school');

  nameForm.oninput = function (event) {
    names.forEach(eachName => {
      let takenName = eachName.textContent.toLowerCase().split(""); 
      let namesValue = event.target.value.trim().toLowerCase().split("");

      if (namesValue.length === 0){
        takenName = eachName.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        eachName.parentNode.parentNode.style.display = 'block';

      } else if (namesValue.length === 1) {
          takenName = eachName.textContent.toLowerCase().split(""); 
          namesValue = event.target.value.trim().toLowerCase().split("");
          if (takenName.includes(namesValue[0])) {
            eachName.parentNode.parentNode.style.display = 'block';
          } else {
            eachName.parentNode.parentNode.style.display = 'none';
          }

      } else if (namesValue.length === 2){
        takenName = eachName.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        if (takenName.includes(namesValue[0]) && takenName.includes(namesValue[1])) {
          eachName.parentNode.parentNode.style.display = 'block';
        } else {
          eachName.parentNode.parentNode.style.display = 'none';
        }

      } else if (namesValue.length === 3) {
        takenName = eachName.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        if (takenName.includes(namesValue[0]) && takenName.includes(namesValue[1]) && takenName.includes(namesValue[2])) {
          eachName.parentNode.parentNode.style.display = 'block';
        } else {
          eachName.parentNode.parentNode.style.display = 'none';
        }

      } else {
        takenName = eachName.textContent.toLowerCase().split(" "); 
        namesValue = event.target.value.toLowerCase().trim();
        if (takenName.includes(namesValue)) {
          eachName.parentNode.parentNode.style.display = 'block';
        } else {
          eachName.parentNode.parentNode.style.display = 'none';
        }
      }
    });
  }

  schoolForm.onchange = function (event) {
    schools.forEach(school => {
      let takenName = school.textContent.toLowerCase().split(""); 
      let namesValue = event.target.value.trim().toLowerCase().split("");

      if (namesValue.length === 0){
        takenName = school.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        school.parentNode.parentNode.style.display = 'block';

      } else if (namesValue.length === 1) {
          takenName = school.textContent.toLowerCase().split(""); 
          namesValue = event.target.value.trim().toLowerCase().split("");
          if (takenName.includes(namesValue[0])) {
            school.parentNode.parentNode.style.display = 'block';
          } else {
            school.parentNode.parentNode.style.display = 'none';
          }

      } else if (namesValue.length === 2){
        takenName = school.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        if (takenName.includes(namesValue[0]) && takenName.includes(namesValue[1])) {
          school.parentNode.parentNode.style.display = 'block';
        } else {
          school.parentNode.parentNode.style.display = 'none';
        }

      } else if (namesValue.length === 3) {
        takenName = school.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        if (takenName.includes(namesValue[0]) && takenName.includes(namesValue[1]) && takenName.includes(namesValue[2])) {
          school.parentNode.parentNode.style.display = 'block';
        } else {
          school.parentNode.parentNode.style.display = 'none';
        }

      } else if (namesValue.length === 4) {
        takenName = school.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        if (takenName.includes(namesValue[0]) && takenName.includes(namesValue[1]) && takenName.includes(namesValue[2]) && takenName.includes(namesValue[3])) {
          school.parentNode.parentNode.style.display = 'block';
        } else {
          school.parentNode.parentNode.style.display = 'none';
        }
      } else if (namesValue.length === 5) {
        takenName = school.textContent.toLowerCase().split(""); 
        namesValue = event.target.value.trim().toLowerCase().split("");
        if (takenName.includes(namesValue[0]) && takenName.includes(namesValue[1]) && takenName.includes(namesValue[2]) && takenName.includes(namesValue[3]) && takenName.includes(namesValue[4])) {
          school.parentNode.parentNode.style.display = 'block';
        } else {
          school.parentNode.parentNode.style.display = 'none';
        }
      } else {
        takenName = school.textContent.toLowerCase().split(" "); 
        namesValue = event.target.value.toLowerCase().trim();
        if (takenName.includes(namesValue)) {
          school.parentNode.parentNode.style.display = 'block';
        } else {
          school.parentNode.parentNode.style.display = 'none';
        }
      }
    });
  }
}
