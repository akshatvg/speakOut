
// Action buttons
function enableUiControls() {
  $("#mic-btn").prop("disabled", false);
  $("#video-btn").prop("disabled", false);
  $("#exit-btn").prop("disabled", false);
  $("#mic-btn").click(function () {
    toggleMic();
  });
  $("#video-btn").click(function () {
    toggleVideo();
  });
  $("#exit-btn").click(function () {
    $('.toast').toast('show');
    setTimeout(leaveChannel(), 900000)
  });

  // Shortcuts
  $(document).keypress(function (e) {
    switch (e.key) {
      case "m":
        toggleMic();
        break;
      case "v":
        toggleVideo();
        break;
      case "q":
        $('.toast').toast('show');
        setTimeout(leaveChannel(), 900000)
        break;
      default:
    }
  });
}

// Toggle Mic
function toggleMic() {
  $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
  if ($("#mic-icon").hasClass('fa-microphone')) {
    localStreams.camera.stream.unmuteAudio(); // enable the local mic
  } else {
    localStreams.camera.stream.muteAudio(); // mute the local mic
  }
}

// Toggle Video
function toggleVideo() {
  if ($("#video-icon").hasClass('fa-video')) {
    localStreams.camera.stream.muteVideo(); // enable the local video
    console.log("muteVideo");
  } else {
    localStreams.camera.stream.unmuteVideo(); // disable the local video
    console.log("unMuteVideo");
  }
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
}