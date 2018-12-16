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

        socket.emit('sendMessage', {
          sender: messageSenderInput.value,
          content: messageContent.value,
          team: messageSenderTeamInput.value
        }, function () {
          
          messageContent.value = '';
        });
      };
        
      socket.on('newMessage', function(params) {

          const eachMessage = document.createElement("div");

          eachMessage.classList.add("each-message");

          if (params.message.sender._id == messageSenderInput.value) {
            eachMessage.classList.add("right");
          } else {
            eachMessage.classList.add("left");
          }

          const spanOne = document.createElement("span");
          const messageSender = document.createElement("div");
          const spanTwo = document.createElement("span");
          const messageContent = document.createElement("div");

          spanOne.innerHTML = params.message.sender.name;
          messageSender.classList.add("message-sender");
          messageSender.appendChild(spanOne);

          spanTwo.innerHTML = params.message.content;
          messageContent.classList.add("message-content");
          messageContent.appendChild(spanTwo);

          eachMessage.appendChild(messageSender);
          eachMessage.appendChild(messageContent);
          messagesBlock.appendChild(eachMessage);

          elem = document.getElementById('messages-block');
          elem.scrollTop = elem.scrollHeight;
      });
    };
  }); 
};
