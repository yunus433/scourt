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
  const messageContent = document.querySelector('.message-sending-input');

  const userValue = document.querySelector('.user-object-value');
  const teamValue = document.querySelector('.team-object-value');

  let elem = document.getElementById('messages-block');
  elem.scrollTop = elem.scrollHeight;


  socket.on('connect', function() {
    
    socket.emit('joinTeam', {
      team: teamValue.value, 
      user: userValue.value
    });

    messageSend.onclick = function (event) {
      event.preventDefault();
      const newMessageObject = {
        sender: messageSenderInput.value,
        content: messageContent.value,
        team: teamValue.value,
        handled: false
      };

      socket.emit('sendMessage', newMessageObject, function (err, message) {
        messageContent.value = '';

        if (!message.handled) {
          message.handled = true;
          createNewMessage(message);
        };
      });
    };
        
    socket.on('newMessage', function(params) {
        if (!params.message.handled) {
          params.message.handled = true;
          createNewMessage(params.message);
        };
    });
  });
}
