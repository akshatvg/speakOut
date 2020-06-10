
// UI buttons
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
    console.log("so sad to see you leave the channel");
    $('.toast').toast('show');
    setTimeout(leaveChannel(), 30000)
  });

  // $("#start-RTMP-broadcast").click(function () {
  //   startLiveTranscoding();
  //   $('#addRtmpConfigModal').modal('toggle');
  //   $('#rtmp-url').val('');
  // });

  // $("#add-external-stream").click(function () {
  //   addExternalSource();
  //   $('#add-external-source-modal').modal('toggle');
  // });

  // keyboard listeners 
  $(document).keypress(function (e) {

    switch (e.key) {
      case "m":
        console.log("squick toggle the mic");
        toggleMic();
        break;
      case "v":
        console.log("quick toggle the video");
        toggleVideo();
        break;
      case "q":
        console.log("so sad to see you quit the channel");
        $('.toast').toast('show');
        setTimeout(leaveChannel(), 30000)
        break;
      default:  // do nothing
    }
  });
}

function toggleBtn(btn) {
  btn.toggleClass('btn-dark').toggleClass('btn-danger');
}

function toggleVisibility(elementID, visible) {
  if (visible) {
    $(elementID).attr("style", "display:block");
  } else {
    $(elementID).attr("style", "display:none");
  }
}

function toggleMic() {
  toggleBtn($("#mic-btn")); // toggle button colors
  toggleBtn($("#mic-dropdown"));
  $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
  if ($("#mic-icon").hasClass('fa-microphone')) {
    localStreams.camera.stream.unmuteAudio(); // enable the local mic
  } else {
    localStreams.camera.stream.muteAudio(); // mute the local mic
  }
}

function toggleVideo() {
  toggleBtn($("#video-btn")); // toggle button colors
  toggleBtn($("#cam-dropdown"));
  if ($("#video-icon").hasClass('fa-video')) {
    localStreams.camera.stream.muteVideo(); // enable the local video
    console.log("muteVideo");
  } else {
    localStreams.camera.stream.unmuteVideo(); // disable the local video
    console.log("unMuteVideo");
  }
  $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
}

$("#mic-btn").prop("disabled", true);
$("#video-btn").prop("disabled", true);
$("#exit-btn").prop("disabled", true);