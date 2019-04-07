window.onload = () => {
  const socket = io();
  const videoFileData = JSON.parse(document.getElementById('video-data').innerHTML);
  const userTeamData = JSON.parse(document.getElementById('team-data').innerHTML);
  const videoSize = Math.round(videoFileData.size/10000) / 100;

  let readMB = 0;
  
  socket.emit('startVideoUpload', {data: videoFileData, team: userTeamData});

  socket.on("dataVideoUpload", (params) => {
    readMB += Math.round(params.bytesRead / 10000) / 100;
    if (readMB >= videoSize){
      readMB = videoSize;
      document.querySelector('.upload-reminder span').innerHTML = "The process is now complete. Please wait for a few minutes..."
    }
    const uploadBar = document.querySelector('.upload-bar');
    const uploadBarDone = document.querySelector('.upload-bar-done');
    const uploadPerCent = document.querySelector('.upload-bar-percent');
    const uploadProcessSpan = document.querySelector('.upload-process').childNodes[0];

    uploadBarDone.style.width = (uploadBar.offsetWidth * readMB / videoSize) + "px";
    uploadPerCent.innerHTML = "%" + (Math.round((readMB * 100 / videoSize) * 100) / 100);
    uploadProcessSpan.innerHTML =  (videoSize - readMB) + " megabytes left in " + videoSize + " megabytes";
  });

  socket.on("videoUploadError", (params) => {
    if (params.err)
      window.location.href = "/de";
  });

  socket.on("finishVideoUpload", (params) => {
    window.location.href = "/de/team/videos"
  });
}
ß
