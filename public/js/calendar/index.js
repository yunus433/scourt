function phoneCalendar() {
  const shortWeekNames = [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
  ];

  for (let i = 0; i < document.getElementsByClassName('calendar-each-day-header').length; i++) {
    document.getElementsByClassName('calendar-each-day-header')[i].childNodes[0].innerHTML = shortWeekNames[i];
  }
}

function squareCalendarDays() {
  const calendarWrapperWidth = window.innerWidth * 8 / 10;

  const calendarEmptyDays = document.getElementsByClassName('calendar-each-day-empty');
  const calendarDays = document.getElementsByClassName('calendar-each-day');

  for (let i = 0; i < calendarEmptyDays.length; i++) {
    calendarEmptyDays[i].style.height = ((calendarWrapperWidth - (14 * calendarWrapperWidth / 100)) / 7) + "px";
  }

  for (let i = 0; i < calendarDays.length; i++) {
    calendarDays[i].style.height = ((calendarWrapperWidth - (14 * calendarWrapperWidth / 100)) / 7) + "px";
  }
}

window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  squareCalendarDays();

  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    phoneCalendar();

  const editMenu = document.querySelector('.user-edit-menu');

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == ('user-description') || event.target.parentNode.className == ('user-description') || event.target.className == ('user-edit-menu') || event.target.className == 'user-description-line' || event.target.parentNode.className == 'user-description-line') {
      editMenu.style.display = 'flex';
    } else {
      editMenu.style.display = 'none';
    }
  });

  const teamObject = JSON.parse(document.getElementById('team-object').value);
  const monthNumber = parseInt(document.getElementById('month-value').value);
  let newYear = 0;
  
  if (new Date().getMonth() > ((new Date().getMonth()+monthNumber)%12))
    newYear = 1;

  const calendarDate = new Date(new Date().getFullYear()+newYear+(Math.floor(monthNumber/12)), ((new Date().getMonth()+monthNumber)%12), 1)

  const week = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  let clicked = false;
  let newEventClicked = false;

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains("calendar-each-day") && event.target.childNodes[0]) {
      const calendarWrapper = document.querySelector('.calendar-wrapper');
      const calendarEventsWrapper = document.querySelector('.calendar-events-wrapper');

      const calendarEventsContent = document.querySelector('.calendar-events-content');
      const calendarEventsTitle = document.querySelector('.calendar-events-title');

      calendarEventsWrapper.style.display = 'flex';
      calendarEventsWrapper.classList.remove('move-down-animation-class');
      calendarEventsWrapper.classList.add('move-up-animation-class');
      calendarWrapper.classList.remove('opacity-increase-animation-class');
      calendarWrapper.classList.add('opacity-decrease-animation-class');

      calendarEventsTitle.innerHTML = event.target.childNodes[0].innerHTML + "/" + (calendarDate.getMonth()) + "/" + calendarDate.getFullYear() + " " + week[new Date(calendarDate.getFullYear(), calendarDate.getMonth(), parseInt(event.target.childNodes[0].innerHTML)-1).getDay()]

      const calendarEvents = teamObject.events.filter(function(teamEvent){ if (teamEvent.date.day == parseInt(event.target.childNodes[0].innerHTML) && teamEvent.date.month == parseInt(calendarDate.getMonth()) && teamEvent.date.year == parseInt(calendarDate.getFullYear())) return teamEvent});

      calendarEventsContent.childNodes.forEach(child => {
        calendarEventsContent.removeChild(child);
      });

      if (calendarEvents.length > 0) {
        calendarEvents.forEach(calendarEvent => {
          const eachEvent = document.createElement('div');
          eachEvent.classList.add('calendar-each-event');

          const eachEventTitle = document.createElement('div');
          eachEventTitle.classList.add('each-event-title');

          const eventTitleDiv = document.createElement('div');
          eventTitleDiv.classList.add('event-title-left');
          const eventTitleSpan = document.createElement('span');
          eventTitleSpan.innerHTML = calendarEvent.name;
          eventTitleDiv.appendChild(eventTitleSpan);
          eachEventTitle.appendChild(eventTitleDiv);

          const eventTypeSpan = document.createElement('span');
          eventTypeSpan.classList.add('event-type');
          eachEventTitle.appendChild(eventTypeSpan);

          eachEvent.appendChild(eachEventTitle);

          const eachEventContent = document.createElement('div');
          eachEventContent.classList.add('each-event-content');
          const eventContentSpan = document.createElement('span');
          eventContentSpan.innerHTML = calendarEvent.description;
          eachEventContent.appendChild(eventContentSpan);
          
          eachEvent.appendChild(eachEventContent);

          calendarEventsContent.appendChild(eachEvent);
        });
      } else {
        const span = document.createElement('span');
        span.innerHTML = 'Nothing marked for this day';
        span.classList.add('no-event-span');
        calendarEventsContent.appendChild(span);
      }

      if (!clicked) {
        clicked = true;
        responsiveDesign(calendarEventsWrapper);
      } else {
        responsiveDesign(calendarEventsContent);
      }
    }

    if (event.target.parentNode.classList.contains("calendar-each-day") && event.target.parentNode.childNodes[0]) {
      const calendarWrapper = document.querySelector('.calendar-wrapper');
      const calendarEventsWrapper = document.querySelector('.calendar-events-wrapper');

      const calendarEventsContent = document.querySelector('.calendar-events-content');
      const calendarEventsTitle = document.querySelector('.calendar-events-title');

      calendarEventsWrapper.style.display = 'flex';
      calendarEventsWrapper.classList.remove('move-down-animation-class');
      calendarEventsWrapper.classList.add('move-up-animation-class');
      calendarWrapper.classList.remove('opacity-increase-animation-class');
      calendarWrapper.classList.add('opacity-decrease-animation-class');

      calendarEventsTitle.innerHTML = event.target.parentNode.childNodes[0].innerHTML + "/" + calendarDate.getMonth() + "/" + calendarDate.getFullYear() + " " + week[new Date(calendarDate.getFullYear(), calendarDate.getMonth(), parseInt(event.target.parentNode.childNodes[0].innerHTML)-1).getDay()]

      const calendarEvents = teamObject.events.filter(function(teamEvent){ if (teamEvent.date.day == parseInt(event.target.parentNode.childNodes[0].innerHTML) && teamEvent.date.month == parseInt(ncalendarDate.getMonth()) && teamEvent.date.year == parseInt(calendarDate.getFullYear())) return teamEvent});

      calendarEventsContent.childNodes.forEach(child => {
        calendarEventsContent.removeChild(child);
      });

      if (calendarEvents.length > 0) {
        calendarEvents.forEach(calendarEvent => {
          const eachEvent = document.createElement('div');
          eachEvent.classList.add('calendar-each-event');

          const eachEventTitle = document.createElement('div');
          eachEventTitle.classList.add('each-event-title');

          const eventTitleDiv = document.createElement('div');
          eventTitleDiv.classList.add('event-title-left');
          const eventTitleSpan = document.createElement('span');
          eventTitleSpan.innerHTML = calendarEvent.name;
          eventTitleDiv.appendChild(eventTitleSpan);
          eachEventTitle.appendChild(eventTitleDiv);

          const eventTypeSpan = document.createElement('span');
          eventTypeSpan.classList.add('event-type');
          eachEventTitle.appendChild(eventTypeSpan);

          eachEvent.appendChild(eachEventTitle);

          const eachEventContent = document.createElement('div');
          eachEventContent.classList.add('each-event-content');
          const eventContentSpan = document.createElement('span');
          eventContentSpan.innerHTML = calendarEvent.description;
          eachEventContent.appendChild(eventContentSpan);
          
          eachEvent.appendChild(eachEventContent);

          calendarEventsContent.appendChild(eachEvent);
        });
      } else {
        const span = document.createElement('span');
        span.innerHTML = 'Nothing marked for this day';
        span.classList.add('no-event-span');
        calendarEventsContent.appendChild(span);
      }

      if (!clicked) {
        clicked = true;
        responsiveDesign(calendarEventsWrapper);
      } else {
        responsiveDesign(calendarEventsContent);
      }
    }

    if (event.target.className == 'calendar-events-close-button' || event.target.parentNode.className == 'calendar-events-close-button') {
      const calendarWrapper = document.querySelector('.calendar-wrapper');
      const calendarEventsWrapper = document.querySelector('.calendar-events-wrapper');

      calendarEventsWrapper.classList.remove('move-up-animation-class');
      calendarEventsWrapper.classList.add('move-down-animation-class');
      calendarWrapper.classList.remove('opacity-decrease-animation-class');
      calendarWrapper.classList.add('opacity-increase-animation-class');
    }

    if (event.target.className == 'calendar-new-event-button' || event.target.parentNode.className == 'calendar-new-event-button') {
      const addNewEventWrapper = document.querySelector('.add-new-event-wrapper');
      addNewEventWrapper.style.display = 'flex';
      document.getElementById('event-date-input').value = document.querySelector('.calendar-events-title').innerHTML.split(' ')[0];
      document.querySelector('.calendar-events-content').style.visibility = 'hidden';
      if (!newEventClicked) {
        newEventClicked = true;
        responsiveDesign(addNewEventWrapper);
      }
    }

    if (event.target.className == 'event-form-back-button') {
      const addNewEventWrapper = document.querySelector('.add-new-event-wrapper');
      addNewEventWrapper.style.display = 'none';
      document.querySelector('.calendar-events-content').style.visibility = 'initial';
    }
  });
};
