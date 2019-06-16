function createNotification(title, content, url) {
  const notificationLine = document.querySelector('.notification-line');

  let notification = document.querySelector('.each-notification');
  if (notification) notificationLine.removeChild(notification);

  const eachNotification = document.createElement('a');
  eachNotification.classList.add('each-notification');
  eachNotification.href = url
  const eachNotificationSymbol = document.createElement('i');
  eachNotificationSymbol.classList.add('fas');
  eachNotificationSymbol.classList.add('fa-bell');
  eachNotificationSymbol.classList.add('each-notification-symbol');
  const notificationTitle = document.createElement('span');
  notificationTitle.classList.add('notification-title');
  notificationTitle.innerHTML = title;
  const notificationContent = document.createElement('span');
  notificationContent.classList.add('notification-content');
  notificationContent.innerHTML = content;
  eachNotification.appendChild(eachNotificationSymbol);
  eachNotification.appendChild(notificationTitle);
  eachNotification.appendChild(notificationContent);
  notificationLine.appendChild(eachNotification);

  setTimeout(() => {
    if (eachNotification) notificationLine.removeChild(eachNotification);
  }, 10 * 1000);
}

window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  const editMenu = document.querySelector('.user-edit-menu');

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == ('user-description') || event.target.parentNode.className == ('user-description') || event.target.className == ('user-edit-menu') || event.target.className == 'user-description-line' || event.target.parentNode.className == 'user-description-line') {
      editMenu.style.display = 'flex';
    } else {
      editMenu.style.display = 'none';
    }
  });

  const socket = io();
  const userValue = document.querySelector('.user-object-value');

  socket.on('connect', function() {
    socket.emit("join", {
      room: userValue.value
    });

    socket.on("newNotification", params => {
      createNotification(params.title, params.content, params.url);
    });
  });
};
