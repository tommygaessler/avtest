const ZoomVideo = window.WebVideoSDK.default

let videoDevices
let localVideoTrack

let speakerDevices
let localSpeakerTrack

let microphoneDevices
let localMicrophoneTrack

ZoomVideo.getDevices().then((devices) => {

  // video
  videoDevices = devices.filter((device) => {
    return device.kind === 'videoinput'
  })

  console.log(videoDevices)

  localVideoTrack = ZoomVideo.createLocalVideoTrack(videoDevices[0].deviceId)

  // microphone

  microphoneDevices = devices.filter((device) => {
    return device.kind === 'audioinput'
  })

  console.log(microphoneDevices)

  localMicrophoneTrack = ZoomVideo.createLocalAudioTrack(microphoneDevices[0].deviceId)

})

function previewVideo() {
  localVideoTrack.start(document.querySelector('#preview-camera-video'))
}

function stopPreviewVideo() {
  localVideoTrack.stop()
}

function startAudio() {
  // starts audio, but does not unmute
  localMicrophoneTrack.start()
}

function stopAudio() {
  // stops audio
  localMicrophoneTrack.stop()
}

var interval

function previewMicrophone() {
  // unmutes
  localMicrophoneTrack.unmute()

  function testMicVisual() {
    const allPids = [...document.querySelectorAll('.pid')]
    const numberOfPidsToColor = Math.round((localMicrophoneTrack.getCurrentVolume() * 500) / 10)
    const pidsToColor = allPids.slice(0, numberOfPidsToColor)
    for (const pid of allPids) {
      pid.style.backgroundColor = '#e6e7e8'
    }
    for (const pid of pidsToColor) {
      pid.style.backgroundColor = '#69ce2b'
    }
  }

  interval = setInterval(testMicVisual, 100)
}

function stopPreviewMicrophone() {
  // mutes
  localMicrophoneTrack.mute()
  const allPids = [...document.querySelectorAll('.pid')]
  allPids.forEach((pid) => {
    pid.style.backgroundColor = '#e6e7e8'
  })
  clearInterval(interval)
}

// to do:
// test speaker, mic playback
// add list of mic, speaker, and video sources to choose from.
