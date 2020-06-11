// Defaults
var agoraAppId = 'a6af85f840ef43108491705e2315a857';
// var channelName = $('#form-channel').val();
var channelName = "hi";
var client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
var mainStreamId;
var cameraVideoProfile = '720p_6';
var localStreams = {
  uid: '',
  camera: {
    camId: '',
    micId: '',
    stream: {}
  }
};
var devices = {
  cameras: [],
  mics: []
}

// Initialise Agora CDN
client.init(agoraAppId, function () {
  console.log('AgoraRTC client initialized');
  joinChannel();
}, function (err) {
});

// Connect New People
client.on('stream-added', function (evt) {
  var stream = evt.stream;
  client.subscribe(stream, function (err) {
  });
});
client.on('stream-subscribed', function (evt) {
  var remoteStream = evt.stream;
  var remoteId = remoteStream.getId();
  console.log("Subscribe remote stream successfully: " + remoteId);
  if ($('#full-screen-video').is(':empty')) {
    mainStreamId = remoteId;
    remoteStream.play('full-screen-video');
  } else {
    addRemoteStreamMiniView(remoteStream);
  }
});

// Stop Stream
client.on('stream-removed', function (evt) {
  var stream = evt.stream;
  stream.stop();
  stream.close();
});

// Join Channel
function joinChannel() {
  var token = generateToken();
  var userID = null;
  // It's a Host
  client.setClientRole('host', function () {
  }, function (e) {
  });
  // Track Stream
  client.join(token, channelName, userID, function (uid) {
    createCameraStream(uid, {});
    localStreams.uid = uid;
  }, function (err) {
  });
}

// Frontal Screen : Camera
function createCameraStream(uid, deviceIds) {
  var localStream = AgoraRTC.createStream({
    streamID: uid,
    audio: true,
    video: true,
    screen: false
  });
  localStream.setVideoProfile(cameraVideoProfile);
  localStream.on("accessAllowed", function () {
    if (devices.cameras.length === 0 && devices.mics.length === 0) {
      getCameraDevices();
      getMicDevices();
    }
  });
  // Show Host How They Look
  localStream.init(function () {
    localStream.play('full-screen-video');
    if ($.isEmptyObject(localStreams.camera.stream)) {
      enableUiControls(localStream);
    } else {
      // Reset Action Buttons
      $("#mic-btn").prop("disabled", false);
      $("#video-btn").prop("disabled", false);
      $("#exit-btn").prop("disabled", false);
    }
    client.publish(localStream, function (err) {
    });
    localStreams.camera.stream = localStream;
  }, function (err) {
  });
}

// Leave Channel
function leaveChannel() {
  client.leave(function () {
    localStreams.camera.stream.stop()
    localStreams.camera.stream.close();
    client.unpublish(localStreams.camera.stream);
    $('#mic-btn').prop('disabled', true);
    $('#video-btn').prop('disabled', true);
    $('#exit-btn').prop('disabled', true);
  }, function (err) {
  });
}

// Generate Token
function generateToken() {
  return null;
}

function changeStreamSource(deviceIndex, deviceType) {
  console.log('Switching stream sources for: ' + deviceType);
  var deviceId;
  var existingStream = false;

  if (deviceType === "video") {
    deviceId = devices.cameras[deviceIndex].deviceId
  }

  if (deviceType === "audio") {
    deviceId = devices.mics[deviceIndex].deviceId;
  }

  localStreams.camera.stream.switchDevice(deviceType, deviceId, function () {
    console.log('successfully switched to new device with id: ' + JSON.stringify(deviceId));
    // set the active device ids
    if (deviceType === "audio") {
      localStreams.camera.micId = deviceId;
    } else if (deviceType === "video") {
      localStreams.camera.camId = deviceId;
    } else {
      console.log("unable to determine deviceType: " + deviceType);
    }
  }, function () {
    console.log('failed to switch to new device with id: ' + JSON.stringify(deviceId));
  });
}

// Get Device Info
// Video Devices
function getCameraDevices() {
  client.getCameras(function (cameras) {
    devices.cameras = cameras;
    cameras.forEach(function (camera, i) {
      var name = camera.label.split('(')[0];
      var optionId = 'camera_' + i;
      var deviceId = camera.deviceId;
      if (i === 0 && localStreams.camera.camId === '') {
        localStreams.camera.camId = deviceId;
      }
      $('#camera-list').append('<a class="dropdown-item" id="' + optionId + '">' + name + '</a>');
    });
    $('#camera-list a').click(function (event) {
      var index = event.target.id.split('_')[1];
      changeStreamSource(index, "video");
    });
  });
}
// Audio Devices
function getMicDevices() {
  client.getRecordingDevices(function (mics) {
    devices.mics = mics;
    mics.forEach(function (mic, i) {
      var name = mic.label.split('(')[0];
      var optionId = 'mic_' + i;
      var deviceId = mic.deviceId;
      if (i === 0 && localStreams.camera.micId === '') {
        localStreams.camera.micId = deviceId;
      }
      if (name.split('Default - ')[1] != undefined) {
        name = '[Default Device]'
      }
      $('#mic-list').append('<a class="dropdown-item" id="' + optionId + '">' + name + '</a>');
    });
    $('#mic-list a').click(function (event) {
      var index = event.target.id.split('_')[1];
      changeStreamSource(index, "audio");
    });
  });
}