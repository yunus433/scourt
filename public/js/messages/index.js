function changeLatestMessage (id, newMessage) {
  document.getElementById('messages_menu_' + id).childNodes[1].childNodes[1].innerHTML = newMessage;
}

function switchMenuItemTop (elementId) {
  const element = document.getElementById('messages_menu_' + elementId);
  const menuWrapper = document.querySelector('.messages-menu');

  while(element.previousElementSibling) {
    menuWrapper.insertBefore(element, element.previousElementSibling);
  }
};

function createNewMessage (params) {
  const messageSenderInput = document.querySelector('.user-object-value');
  const messagesBlock = document.querySelector('.messages-block');
  const eachMessage = document.createElement("div");

  eachMessage.classList.add("each-message");

  const spanOne = document.createElement("strong");
  const spanTwo = document.createElement("span");

  if (params.from._id == messageSenderInput.value) {
    spanOne.innerHTML = "You";
    eachMessage.classList.add("right");
  } else {
    spanOne.innerHTML = params.from.name;
    eachMessage.classList.add("left");
  }

  spanOne.style = "color: " + params.from.color;
  spanOne.classList.add("message-sender");

  spanTwo.innerHTML = params.content;
  spanTwo.classList.add("message-content");

  eachMessage.appendChild(spanOne);
  eachMessage.appendChild(spanTwo);
  messagesBlock.appendChild(eachMessage);

  messagesBlock.scrollTop = messagesBlock.scrollHeight;
  responsiveDesign(eachMessage);
  switchMenuItemTop(params.to);
  changeLatestMessage(params.to, params.content);
}

window.onload = () => {
  if ( !/iPad|iPadPro/i.test(navigator.userAgent) )
    responsiveDesign(document);

  // user menu listener
  const editMenu = document.querySelector('.user-edit-menu');

  document.addEventListener('mouseover', (event) => {
    if (event.target.className == ('user-description') || event.target.parentNode.className == ('user-description') || event.target.className == ('user-edit-menu') || event.target.className == 'user-description-line' || event.target.parentNode.className == 'user-description-line') {
      editMenu.style.display = 'flex';
    } else {
      editMenu.style.display = 'none';
    }
  });
   

  // variable declaration
  const userValue = document.querySelector('.user-object-value').value;
  const teamValue = document.querySelector('.team-object-value').value;
  const currentRoom = document.querySelector('.room-id').value;

  // scroll top on reload
  let messagesBlock = document.querySelector('.messages-block');
  messagesBlock.scrollTop = messagesBlock.scrollHeight;

  // choose selected one
  if (document.getElementById('messages_menu_' + currentRoom))
    document.getElementById('messages_menu_' + currentRoom).style.backgroundColor = 'rgb(249, 249, 249)';

  // define type variable
  let type;
  if (currentRoom == teamValue) {
    type = "team";
  } else {
    type = "user";
  }

  // socket.io
  const socket = io();

  socket.on('connect', function() {
    
    // join room
    socket.emit('join', {
      room: userValue
    });

    // listen for message button
    const form = document.querySelector('.new-message-form');

    form.onsubmit = (event) => {
      event.preventDefault();

      const newMessageObject = {
        type,
        from: userValue,
        to: currentRoom,
        content: document.querySelector('.message-sending-input').value
      };

      // emit new message
      socket.emit('sendMessage', newMessageObject, function (err, message) {
        document.querySelector('.message-sending-input').value = '';
        createNewMessage(message);
      });
    }

    document.addEventListener('click', (event) => {
      if (event.target.className == 'menu-open-line' || event.target.parentNode.className == 'menu-open-line') {
        document.querySelector('.menu-open-line').style.display = 'none';
        document.querySelector('.messages-menu').style.display = 'flex';
        document.querySelector('.messages-wrapper').style.display = 'none';
      }
    });
        
    // listen for new message
    socket.on('newMessage', (params) => {
      if (params.from._id != currentRoom) {
        changeLatestMessage(params.from._id, params.content);
        switchMenuItemTop(params.from._id);
      } else {
        if (params.from._id != userValue.value) {
          createNewMessage(params);
        }
      }
    });
  });
};
