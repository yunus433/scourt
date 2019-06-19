let timeOfDrill = "5 min";

function createNewDrill(drill) {
  const eachDrill = document.createElement("div");
  eachDrill.classList.add("each-drill");

  const drillSettings = document.createElement('div');
  drillSettings.classList.add('drill-settings');
  const placeIcon = document.createElement('i');
  placeIcon.classList.add('fas');
  placeIcon.classList.add('fa-angle-up');
  drillSettings.appendChild(placeIcon);
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas');
  deleteIcon.classList.add('fa-trash');
  drillSettings.appendChild(deleteIcon);
  const placeIcon2 = document.createElement('i');
  placeIcon2.classList.add('fas');
  placeIcon2.classList.add('fa-angle-down');
  drillSettings.appendChild(placeIcon2);
  eachDrill.appendChild(drillSettings);

  const drillName = document.createElement("span");
  drillName.classList.add("drill-name");
  drillName.innerHTML = drill.childNodes[0].innerHTML;
  eachDrill.appendChild(drillName);

  const drillTime = document.createElement("span");
  drillTime.classList.add("drill-duration");
  drillTime.innerHTML = timeOfDrill;
  eachDrill.appendChild(drillTime);

  const drillFor = document.createElement("input");
  drillFor.classList.add("drill-for");
  drillFor.value = "Everyone";
  eachDrill.appendChild(drillFor);

  const drillExtra = document.createElement("input");
  drillExtra.classList.add("drill-extra");
  drillExtra.value = "-";
  eachDrill.appendChild(drillExtra);

  document.querySelector(".session-each-drill-wrapper").appendChild(eachDrill);
  responsiveDesign(eachDrill);
}

window.onload = () => {
  if (!/iPad|iPadPro/i.test(navigator.userAgent)) 
    responsiveDesign(document);

  const editMenu = document.querySelector('.user-edit-menu');

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == ('user-description') || event.target.parentNode.className == ('user-description') || event.target.className == ('user-edit-menu') || event.target.className == 'user-description-line' || event.target.parentNode.className == 'user-description-line') {
      editMenu.style.display = 'flex';
    } else {
      editMenu.style.display = 'none';
    }
  });

  let sessionTypeSelected = false;

  document.addEventListener("click", event => {
    if (event.target.value) {
      event.target.select();
    }

    if (event.target.parentNode.className == "session-times-header") {
      document.querySelector(".selected-session-time").classList.remove("selected-session-time");
      event.target.classList.add("selected-session-time");
      document.querySelector('.session-types-content').style.display = 'none';
      setTimeout(() => {
        document.querySelector('.session-types-content').style.display = 'flex';
      }, 100);

      timeOfDrill = event.target.innerHTML;
    }

    if (event.target.classList.contains('fa-trash')) {
      event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
    }

    if (event.target.classList.contains('fa-angle-up')) {
      event.target.parentNode.parentNode.parentNode.insertBefore(event.target.parentNode.parentNode, event.target.parentNode.parentNode.previousElementSibling);
    }

    if (event.target.classList.contains('fa-angle-down')) {
      event.target.parentNode.parentNode.parentNode.insertBefore(event.target.parentNode.parentNode.nextElementSibling, event.target.parentNode.parentNode);
    }

    if (event.target.className == 'session-send-line' || event.target.parentNode.className == 'session-send-line') {
      document.querySelector('.session-send-form').style.display = 'flex';

      const array = [];
      const drills = document.querySelectorAll('.each-drill');

      for (let i = 0; i < drills.length; i++) {
        const newDrill = {
          name: "",
          duration: "",
          for: "",
          extra: ""
        };
        
        newDrill.name = drills[i].childNodes[1].innerHTML;
        newDrill.duration = drills[i].childNodes[2].innerHTML;
        newDrill.for = drills[i].childNodes[3].value;
        newDrill.extra = drills[i].childNodes[4].value;

        array.push(newDrill);
      }

      setTimeout(() => {
        document.getElementById('session-drill-input').value = JSON.stringify(array);
      }, 100);     
    }

    if (event.target.className == 'form-close-button' || event.target.parentNode.className == 'form-close-button') {
      document.querySelector('.session-send-form').style.display = 'none';
    }
  });

  const selectedDrill = document.querySelector('.selected-session-type');

  document.addEventListener('mousemove', event => {
    if (selectedDrill.style.display != 'none') {
      selectedDrill.style.left = event.clientX - selectedDrill.offsetWidth / 2 + "px";
      selectedDrill.style.top = event.clientY - selectedDrill.offsetHeight / 2 + "px";
    }
  });

  document.addEventListener('mousedown', event => {
    if (event.target.className == 'each-session-type') {
      sessionTypeSelected = true;
      selectedDrill.style.display = 'flex';
      selectedDrill.childNodes[0].innerHTML = event.target.childNodes[1].innerHTML;
      selectedDrill.width = document.querySelector('.session-types-content').offsetWidth * 0.8;
      selectedDrill.style.left = event.clientX - selectedDrill.offsetWidth / 2 + "px";
      selectedDrill.style.top = event.clientY - selectedDrill.offsetHeight / 2 + "px";
    }
    if (event.target.parentNode.className == 'each-session-type') {
      sessionTypeSelected = true;
      selectedDrill.style.display = 'flex';
      selectedDrill.childNodes[0].innerHTML = event.target.parentNode.childNodes[1].innerHTML;
      selectedDrill.width = document.querySelector('.session-types-content').offsetWidth * 0.8;
      selectedDrill.style.left = event.clientX - selectedDrill.offsetWidth / 2 + "px";
      selectedDrill.style.top = event.clientY - selectedDrill.offsetHeight / 2 + "px";
    }
  });
  
  document.addEventListener('mouseup', event => {
    const positionOfWrapper = document.querySelector(".session-each-drill-wrapper").getBoundingClientRect();

    if (
      sessionTypeSelected &&
      event.clientX > positionOfWrapper.left &&
      event.clientX < positionOfWrapper.right &&
      event.clientY > positionOfWrapper.top &&
      event.clientY < positionOfWrapper.bottom 
    ) {
      document.querySelector('.session-more-header').style.display = 'flex';
      document.querySelector('.session-send-line').style.display = 'flex';
      document.querySelector('.session-drag-drop-span').style.display = 'none';
      selectedDrill.style.display = 'none';
      createNewDrill(selectedDrill);
      sessionTypeSelected = false;
    } else {
      selectedDrill.style.display = 'none';
      selectedDrill.style.left = "100vw";
      selectedDrill.style.top = "100vh";
      sessionTypeSelected = false;
    }
  });
};
