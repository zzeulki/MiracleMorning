<template>
  <div class="home">
    <video id="video" autoplay playsinline></video>
    <button class="capture-btn" onclick="capture">📸</button>
  </div>
</template>

<script>
const userMedia = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: 375,
    height: 500,
    facinMode: 'environment'
  }
})
userMedia.then(function (stream) {
  const video = document.getElementById('video')
  const videoTracks = stream.getVideoTracks()[0]
  video.srcObject = stream
}).catch(function (error) {
  console.error(error.message)
})

export default {
  name: 'Camera',
  data () {
    return {
      showCamera: false
    }
  }
}
</script>

<style scoped style="scss">
  video {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
    padding: 2vw !important;
  }
  .capture-btn {
    font-size: 10vw !important;
    width: 10vw !important;
    height: 10vw !important;
    padding: 2vw !important;
}
</style>
