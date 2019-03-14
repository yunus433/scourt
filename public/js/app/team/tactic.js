function generateRandomId() {
  return (String.fromCharCode(65 + Math.floor(Math.random() * 26))) + Date.now();
}

function getMouseCanvasPosition(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: (((evt.clientX - rect.left) * 100) / canvas.offsetWidth),
    y: (((evt.clientY - rect.top) * 100) / (canvas.offsetWidth * 376 / 600))
  };
};

function drawLine(canvas, firstPosition, lastPosition, color, width, dashed) {
  let ctx = canvas.getContext("2d");

  firstPosition.y = firstPosition.y * (canvas.offsetWidth * 376 / 600) / 100;
  lastPosition.y = lastPosition.y * (canvas.offsetWidth * 376 / 600) / 100;

  ctx.strokeStyle = color;
  ctx.lineWidth = width * (canvas.offsetWidth / 1000);
  if (dashed) {
    ctx.setLineDash([5]);
  } else {
    ctx.setLineDash([0]);
  }
  ctx.beginPath();
  ctx.moveTo((firstPosition.x * canvas.offsetWidth) / 100, firstPosition.y);
  ctx.lineTo((lastPosition.x * canvas.offsetWidth) / 100, lastPosition.y);
  ctx.stroke();
};

function addPlayer(name, position) {
  const canvas = document.querySelector('.drawing-area-canvas');

  position.x = position.x * canvas.offsetWidth / 100;
  position.y = position.y * (canvas.offsetWidth * 376 / 600) / 100;

  const allContent = document.querySelector('.all-content-main');
  const newPlayer = document.createElement("div");
  newPlayer.classList.add("canvas-each-player");

  const newImage = document.createElement("img");
  newImage.src = "/res/images/player.png";

  const playerNameSpan = document.createElement("span");
  playerNameSpan.innerHTML = name;
  playerNameSpan.classList.add("canvas-each-player-name");

  const playerWidth = (30 * canvas.offsetWidth / 960);

  if (position.x + (playerWidth / 2) > canvas.offsetWidth) {
    newPlayer.style.marginLeft = (position.x + document.querySelector(".drawing-area-menu").offsetWidth - playerWidth + 13) + "px";
  } else if (position.x > (playerWidth / 2)) {
    newPlayer.style.marginLeft = (position.x + document.querySelector(".drawing-area-menu").offsetWidth - (playerWidth / 2) + 15) + "px";
  } else {
    newPlayer.style.marginLeft = (document.querySelector(".drawing-area-menu").offsetWidth + 20) + "px";
  }

  if (position.y + (playerWidth / 2) > canvas.offsetHeight) {
    newPlayer.style.marginTop = (position.y - playerWidth) + "px";
  } else if (position.y - playerWidth > 0) {
    newPlayer.style.marginTop = (position.y - playerWidth) + "px";
  } else {
    newPlayer.style.marginTop = "0px";
  }

  newPlayer.style.width = playerWidth + "px";

  newPlayer.appendChild(newImage);
  newPlayer.appendChild(playerNameSpan);
  allContent.appendChild(newPlayer);
}

function addNote(content, color, position, id) {
  const canvas = document.querySelector('.drawing-area-canvas');
  position.x = position.x * canvas.offsetWidth / 100;
  position.y = position.y * (canvas.offsetWidth * 376 / 600) / 100;
  const allContent = document.querySelector('.all-content-main');
  const newNote = document.createElement("div");
  newNote.classList.add("canvas-each-note");
  newNote.style.backgroundColor = color;

  const noteButtonDiv = document.createElement("div");
  noteButtonDiv.classList.add("each-note-button-wrapper");

  const noteButtonWrapper = document.createElement("a");
  noteButtonWrapper.href = "/app/team/tactic/deleteNote/?id=" + id;
  const noteButton = document.createElement("i");
  noteButton.classList.add("fas");
  noteButton.classList.add("fa-times");

  const noteSpan = document.createElement("span");
  noteSpan.innerHTML = content;

  const noteDeleteButton = document.createElement("i");
  noteDeleteButton.classList.add("fas");
  noteDeleteButton.classList.add("fa-trash");

  if (position.x + 15 >= canvas.width) {
    newNote.style.marginLeft = (document.querySelector(".drawing-area-menu").offsetWidth + position.x) + "px";
  } else {
    newNote.style.marginLeft = (document.querySelector(".drawing-area-menu").offsetWidth + position.x + 15) + "px";
  }

  if (position.y + 15 < canvas.offsetHeight) {
    newNote.style.marginTop = (position.y) + "px";
  } else {
    newNote.style.marginTop = (position.y - 15) + "px";
  }

  if (document.querySelector('.drawing-options-menu')) {
    noteButtonWrapper.appendChild(noteDeleteButton);
    noteButtonDiv.appendChild(noteButtonWrapper);
  }
  noteButtonDiv.appendChild(noteButton);
  newNote.appendChild(noteButtonDiv);
  newNote.appendChild(noteSpan);
  allContent.appendChild(newNote);
}

function createOldElements(canvas) {
  const tacticBoard = JSON.parse(document.querySelector(".all-data-span").innerHTML);

  tacticBoard.playerDatas.forEach(player => {
    addPlayer(player.name, player.position);
  });

  tacticBoard.noteDatas.forEach(note => {
    addNote(note.value, note.backgroundColor, note.position, note._id);
  });

  tacticBoard.lineDatas.forEach(line => {
    let dashed = false;
    if (line.type == 'dashed') {dashed = true};

    drawLine(canvas, line.firstPosition, line.lastPosition, line.color, line.width, dashed);
  });
};

window.onload = () => {
  const canvas = document.getElementById('drawing-area-canvas');
  setTimeout(function () {
    createOldElements(canvas);
  }, 500);

  const contentSideHeader = document.querySelector('.content-side-header');
  document.addEventListener('click', (event) => {
    if (event.target.className == 'content-side-header-open-button' || event.target.parentNode.className == 'content-side-header-open-button') { 
      contentSideHeader.style.display = 'flex'; 
    } else {
      contentSideHeader.style.display = 'none'; 
    }
  });

  const userDescriptionLines = document.querySelectorAll('.user-description-line');
  document.addEventListener('click', (event) => {
    if (event.target.className == 'user-description' || event.target.parentNode.className == 'user-description-line-first') { 
      userDescriptionLines[0].style.display = 'flex'; 
      userDescriptionLines[1].style.display = 'flex'; 
      userDescriptionLines[2].style.display = 'flex'; 
    } else {
      userDescriptionLines[0].style.display = 'none'; 
      userDescriptionLines[1].style.display = 'none'; 
      userDescriptionLines[2].style.display = 'none'; 
    }
  });

  // canvas controllers
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  let newLineAddButtonChecked = false;
  let newPlayerAddButtonChecked = false;
  let newNoteAddButtonChecked = false;

  let lineDatas = [];
  let playerDatas = [];
  let noteDatas = [];

  const lineProperties = document.querySelector('.canvas-line-properties');
  const playerProperties = document.querySelector('.canvas-player-properties');
  const noteProperties = document.querySelector('.canvas-note-properties');
  const lineDeleteWrapper = document.querySelector('.canvas-delete-line-wrapper');

  document.addEventListener('click', (event) => {

    // Adding menu button listeners
    if (event.target.className == 'canvas-add-new-line-button') {
      playerProperties.style.display = 'none';
      noteProperties.style.display = 'none';
      lineDeleteWrapper.style.display = 'none';
      if (!newLineAddButtonChecked) {
        newLineAddButtonChecked = true;
        newPlayerAddButtonChecked = false;
        newNoteAddButtonChecked = false;
        lineProperties.style.display  = 'flex';
        canvas.style.cursor = 'crosshair';
      } else {
        newLineAddButtonChecked = false;
        lineProperties.style.display = 'none';
        canvas.style.cursor = 'auto';
      }
    };

    if (event.target.className == 'canvas-add-new-player-button') {
      lineProperties.style.display = 'none';
      noteProperties.style.display = 'none';
      lineDeleteWrapper.style.display = 'none';
      if (!newPlayerAddButtonChecked) {
        newPlayerAddButtonChecked = true;
        newLineAddButtonChecked = false;
        newNoteAddButtonChecked = false;
        playerProperties.style.display = 'flex';
        canvas.style.cursor = 'crosshair';
      } else {
        newPlayerAddButtonChecked = false;
        canvas.style.cursor = 'auto';
        playerProperties.style.display = 'none';
      }
    }

    if (event.target.className == 'canvas-add-new-note-button') {
      lineProperties.style.display = 'none';
      playerProperties.style.display = 'none';
      lineDeleteWrapper.style.display = 'none';
      if (!newNoteAddButtonChecked) {
        newNoteAddButtonChecked = true;
        newLineAddButtonChecked = false;
        newPlayerAddButtonChecked = false;
        noteProperties.style.display = 'flex';
        canvas.style.cursor = 'crosshair';
      } else {
        newNoteAddButtonChecked = false;
        canvas.style.cursor = 'auto';
        noteProperties.style.display = 'none';
      }
    }

    if (event.target.className == 'canvas-delete-line-button') {
      lineProperties.style.display = 'none';
      playerProperties.style.display = 'none';
      noteProperties.style.display = 'none';
      if (lineDeleteWrapper.style.display == 'none') {
        lineDeleteWrapper.style.display = 'block';
      } else {
        lineDeleteWrapper.style.display = 'none';
      }
    }

    if (event.target.className == 'canvas-save-changes-button' || event.target.parentNode.className == 'canvas-save-changes-button') {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/app/team/tactic/save");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
          lineDatas,
          playerDatas,
          noteDatas
      }));

      lineDatas = [];
      playerDatas = [];
      noteDatas = [];

      const saveButton = document.querySelector('.canvas-save-changes-button');
      saveButton.childNodes[0].innerHTML = "Saved";
      saveButton.style.cursor = "not-allowed";

      setTimeout(function () {
        saveButton.childNodes[0].innerHTML = "Save";
        saveButton.style.cursor = "pointer";
        location.reload();
      }, 1000)
    }

    // Tactic board adding element listeners
    if (newPlayerAddButtonChecked && event.target.className == 'drawing-area-canvas' && document.querySelector('.canvas-player-name-input').value) {
      const canvas = document.querySelector('.drawing-area-canvas');
      const mousePosition = getMouseCanvasPosition(canvas, event);
      const playerName = document.querySelector('.canvas-player-name-input').value;
      const playerInfo = document.querySelector('.canvas-player-info').value;

      const playerData = {
        name: playerName,
        info: playerInfo,
        position: {
          x: mousePosition.x,
          y: mousePosition.y
        },
        _id: generateRandomId()
      };

      playerDatas.push(playerData);

      playerName.value = "";
      playerInfo.value = "";

      addPlayer(playerName, mousePosition);
    }

    if (newNoteAddButtonChecked && event.target.className == 'drawing-area-canvas' && document.querySelector('.canvas-new-note-value').value) {
      const text = document.querySelector('.canvas-new-note-value').value;
      const color = document.getElementById('canvas-note-color').value;
      const position = getMouseCanvasPosition(canvas, event);
      const id = generateRandomId();

      const noteData = {
        backgroundColor: color,
        value: text,
        position: {
          x: position.x,
          y: position.y
        },
        _id: id
      };

      noteDatas.push(noteData);
      text.value = "";
      addNote(text, color, position, id);
    }

    // Player object listeners
    if (event.target.className == 'each-player-object') {
      if (event.target.parentNode.childNodes[1].style.display == 'block') {
        event.target.parentNode.childNodes[1].style.display = 'none';
      } else {
        event.target.parentNode.childNodes[1].style.display = 'block';
      }
    }
    if (event.target.parentNode.className == 'each-player-object') {
      if (event.target.parentNode.parentNode.childNodes[1].style.display == 'block') {
        event.target.parentNode.parentNode.childNodes[1].style.display = 'none';
      } else {
        event.target.parentNode.parentNode.childNodes[1].style.display = 'block';
      }
    }

    // Note object listeners
    if (event.target.className == 'fas fa-times') {
      event.target.parentNode.parentNode.childNodes[0].style.display = 'none';
      event.target.parentNode.parentNode.childNodes[1].style.display = 'none';
      event.target.parentNode.parentNode.style.cursor = 'pointer';
      event.target.parentNode.parentNode.style.height = '5px';
      event.target.parentNode.parentNode.style.width = '5px';
    }
    if (event.target.className == 'canvas-each-note') {
      event.target.childNodes[0].style.display = 'flex';
      event.target.childNodes[1].style.display = 'block';
      event.target.style.cursor = 'auto';
      event.target.style.height = 'auto';
      event.target.style.width = '150px';
    }
  });

  // Draw line event listener
  document.addEventListener('mousedown', function mouseDown (event) {
    if (event.target.className == 'drawing-area-canvas' && newLineAddButtonChecked) {
      const canvas = document.querySelector('.drawing-area-canvas');
      const firstPosition = getMouseCanvasPosition(canvas, event);
  
      if ((firstPosition.y - (canvas.offsetWidth * 376 / 600)) <= 0) {
        document.addEventListener('mouseup', function mouseUp (event) {
          if (event.target.className == 'drawing-area-canvas') {
            const color = document.getElementById('canvas-line-color').value;
            const width = document.getElementById('canvas-line-width').value;
            const type = document.getElementById('canvas-line-type').value;
            let dashed = false;
            if (type == 'dashed') {
              dashed = true;
            } else {
              dashed = false;
            }
  
            const lastPosition = getMouseCanvasPosition(canvas, event);

            const lineData = {
              color,
              width,
              type,
              firstPosition: {
                x: firstPosition.x,
                y: firstPosition.y
              },
              lastPosition: {
                x: lastPosition.x,
                y: lastPosition.y
              },
              _id: generateRandomId()
            };
  
            lineDatas.push(lineData);
            drawLine(canvas, firstPosition, lastPosition, color, width, dashed);
            document.removeEventListener('mouseup', mouseUp);
          };
        });
      };
    };
  });

  // Mouseout event listeners
  document.addEventListener('mouseout', event => {
    if (event.target.className == 'each-delete-line') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const lineObject = JSON.parse(event.target.childNodes[1].innerHTML);
      let dashed = false;
      if (lineObject.type != 'normal') {
        dashed = true;
      }

      drawLine(canvas, lineObject.firstPosition, lineObject.lastPosition, lineObject.color, lineObject.width, dashed);
    }

    if (event.target.parentNode.className == 'each-delete-line') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const lineObject = JSON.parse(event.target.parentNode.childNodes[1].innerHTML);
      let dashed = false;
      if (lineObject.type != 'normal') {
        dashed = true;
      }

      drawLine(canvas, lineObject.firstPosition, lineObject.lastPosition, lineObject.color, lineObject.width, dashed);
    }

    if (event.target.parentNode.parentNode.className == 'each-delete-line') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const lineObject = JSON.parse(event.target.parentNode.parentNode.childNodes[1].innerHTML);
      let dashed = false;
      if (lineObject.type != 'normal') {
        dashed = true;
      }

      drawLine(canvas, lineObject.firstPosition, lineObject.lastPosition, lineObject.color, lineObject.width, dashed);
    }
  });

  // Mouseover event listener
  document.addEventListener('mouseover', event => {
    if (event.target.className == 'each-player-object') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const allContent = document.querySelector('.all-content-main');

      const wrapper = document.createElement("div");
      wrapper.classList.add("canvas-player-wrapper");
      const position = JSON.parse(event.target.childNodes[2].innerHTML);
      position.x = position.x * canvas.offsetWidth / 100;
      position.y = position.y * (canvas.offsetWidth * 376 / 600) / 100;

      const playerWidth = (30 * canvas.offsetWidth / 960);

      if (position.x + (playerWidth / 2) > canvas.offsetWidth) {
        wrapper.style.marginLeft = (position.x + document.querySelector(".drawing-area-menu").offsetWidth - playerWidth + 13 - 10) + "px";
      } else if (position.x > (playerWidth / 2)) {
        wrapper.style.marginLeft = (position.x + document.querySelector(".drawing-area-menu").offsetWidth - (playerWidth / 2) + 15 - 10) + "px";
      } else {
        wrapper.style.marginLeft = (document.querySelector(".drawing-area-menu").offsetWidth + 20 - 10) + "px";
      }
    
      if (position.y + (playerWidth / 2) > canvas.offsetHeight) {
        wrapper.style.marginTop = (position.y - playerWidth - 5) + "px";
      } else if (position.y - playerWidth > 0) {
        wrapper.style.marginTop = (position.y - playerWidth - 5) + "px";
      } else {
        wrapper.style.marginTop = "-5px";
      }

      console.log(playerWidth);
      wrapper.style.width = (playerWidth + 20) + "px";
      wrapper.style.height = (playerWidth + 20) + "px";

      allContent.appendChild(wrapper);

      document.addEventListener('mouseout', function mouseOut (e) {
        if (e.target.className == 'each-player-object') {
          allContent.removeChild(wrapper);
          document.removeEventListener('mouseout', mouseOut);
        }
      });
    }

    if (event.target.parentNode.className == 'each-player-object') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const allContent = document.querySelector('.all-content-main');

      const wrapper = document.createElement("div");
      wrapper.classList.add("canvas-player-wrapper");
      const position = JSON.parse(event.target.parentNode.childNodes[2].innerHTML);

      if (position.x + 25 > canvas.offsetWidth) {
        wrapper.style.marginLeft = (position.x + document.querySelector(".drawing-area-menu").offsetWidth - 30 - 8) + "px";
      } else if (position.x > 25) {
        wrapper.style.marginLeft = (position.x + document.querySelector(".drawing-area-menu").offsetWidth - 10 - 8) + "px";
      } else {
        wrapper.style.marginLeft = (document.querySelector(".drawing-area-menu").offsetWidth + 15 - 8) + "px";
      }
    
      if (position.y + 25 > canvas.offsetHeight) {
        wrapper.style.marginTop = (position.y - 50 - 6) + "px";
      } else if (position.y - 35 > 0) {
        wrapper.style.marginTop = (position.y - 25 - 6) + "px";
      } else {
        wrapper.style.marginTop = "-6px";
      }

      allContent.appendChild(wrapper);

      document.addEventListener('mouseout', function mouseOut (e) {
        if (e.target.parentNode.className == 'each-player-object') {
          allContent.removeChild(wrapper);
          document.removeEventListener('mouseout', mouseOut);
        }
      });
    }

    if (event.target.className == 'each-delete-line') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const lineObject = JSON.parse(event.target.childNodes[1].innerHTML);
      let dashed = false;
      if (lineObject.type != 'normal') {
        dashed = true;
      }

      drawLine(canvas, lineObject.firstPosition, lineObject.lastPosition, '#ff0000', lineObject.width, dashed);
    }

    if (event.target.parentNode.className == 'each-delete-line') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const lineObject = JSON.parse(event.target.parentNode.childNodes[1].innerHTML);
      let dashed = false;
      if (lineObject.type != 'normal') {
        dashed = true;
      }

      drawLine(canvas, lineObject.firstPosition, lineObject.lastPosition, '#ff0000', lineObject.width, dashed);
    }

    if (event.target.parentNode.parentNode.className == 'each-delete-line') {
      const canvas = document.querySelector('.drawing-area-canvas');
      const lineObject = JSON.parse(event.target.parentNode.parentNode.childNodes[1].innerHTML);
      let dashed = false;
      if (lineObject.type != 'normal') {
        dashed = true;
      }

      drawLine(canvas, lineObject.firstPosition, lineObject.lastPosition, '#ff0000', lineObject.width, dashed);
    }
  });

  window.onresize = () => {
    location.reload();
  };
};
