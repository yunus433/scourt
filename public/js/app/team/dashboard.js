function createNewMessage (params) {
  const messageSenderInput = document.querySelector('.message-sender-input');
  const messagesBlock = document.querySelector('.messages-block');
  const eachMessage = document.createElement("div");

  eachMessage.classList.add("each-message");

  if (params.sender._id == messageSenderInput.value) {
    eachMessage.classList.add("right");
  } else {
    eachMessage.classList.add("left");
  }

  const spanOne = document.createElement("span");
  const messageSender = document.createElement("div");
  const spanTwo = document.createElement("span");
  const messageContent = document.createElement("div");

  spanOne.innerHTML = params.sender.name;
  messageSender.classList.add("message-sender");
  messageSender.appendChild(spanOne);

  spanTwo.innerHTML = params.content;
  messageContent.classList.add("message-content");
  messageContent.appendChild(spanTwo);

  eachMessage.appendChild(messageSender);
  eachMessage.appendChild(messageContent);
  messagesBlock.appendChild(eachMessage);

  elem = document.getElementById('messages-block');
  elem.scrollTop = elem.scrollHeight;
}

window.onload = () => {
  let socket = io();

  const messagesBlock = document.querySelector('.messages-block');

  const messageSend = document.querySelector('.message-sending-button');
  const messageSenderInput = document.querySelector('.message-sender-input');
  const messageSenderTeamInput = document.querySelector('.message-sender-team-input');
  const messageContent = document.querySelector('.message-sending-input');

  const userValue = document.querySelector('.user-object-value');
  const teamValue = document.querySelector('.team-object-value');

  if (messagesBlock) {
    let elem = document.getElementById('messages-block');
    elem.scrollTop = elem.scrollHeight;
  }

  socket.on('connect', function() {
    
    socket.emit('joinTeam', {
      team: teamValue.value, 
      user: userValue.value
    });

    if (messagesBlock) {
      messageSend.onclick = function (event) {
        event.preventDefault();
        const newMessageObject = {
          sender: messageSenderInput.value,
          content: messageContent.value,
          team: teamValue.value
        }

        socket.emit('sendMessage', newMessageObject, function (err, message) {
          messageContent.value = '';

          createNewMessage(message);
        });
      };
        
      socket.on('newMessage', function(params) {
          createNewMessage(params.message);
      });
    };
  }); 

  const teamWrapper = document.querySelector('.team-main-wrapper');
  const messageWrapper = document.querySelector('.messages-wrapper');
  const calendarWrapper = document.querySelector('.calendar-wrapper');

  document.addEventListener('click', (event) => {
    if (event.target.closest('.team-header-part')) {
      messageWrapper.style.display = 'none';
      calendarWrapper.style.display = 'none';
      teamWrapper.style.display = 'flex';
      document.querySelector('.team-header-part').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      document.querySelector('.team-header-part').style.color = 'white';
      document.querySelector('.message-header-part').style.backgroundColor = 'white';
      document.querySelector('.message-header-part').style.color = 'rgba(0, 0, 0, 0.8)';
      document.querySelector('.date-header-part').style.backgroundColor = 'white';
      document.querySelector('.date-header-part').style.color = 'rgba(0, 0, 0, 0.8)';
    } else if (event.target.closest('.message-header-part')) {
      document.querySelector('.team-header-part').style.backgroundColor = 'white';
      document.querySelector('.team-header-part').style.color = 'rgba(0, 0, 0, 0.8)';
      document.querySelector('.message-header-part').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      document.querySelector('.message-header-part').style.color = 'white';
      document.querySelector('.date-header-part').style.backgroundColor = 'white';
      document.querySelector('.date-header-part').style.color = 'rgba(0, 0, 0, 0.8)';
      messageWrapper.style.display = 'flex';
      calendarWrapper.style.display = 'none';
      teamWrapper.style.display = 'none';
      let elem = document.getElementById('messages-block');
      elem.scrollTop = elem.scrollHeight;
    } else if (event.target.closest('.date-header-part')) {
      document.querySelector('.team-header-part').style.backgroundColor = 'white';
      document.querySelector('.team-header-part').style.color = 'rgba(0, 0, 0, 0.8)';
      document.querySelector('.message-header-part').style.backgroundColor = 'white';
      document.querySelector('.message-header-part').style.color = 'rgba(0, 0, 0, 0.8)';
      document.querySelector('.date-header-part').style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      document.querySelector('.date-header-part').style.color = 'white';
      calendarWrapper.style.display = 'flex';
      messageWrapper.style.display = 'none';
      teamWrapper.style.display = 'none';
    }
  });

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
  })
};
