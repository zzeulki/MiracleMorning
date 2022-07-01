<template>
  <div class="camera-view">
    <div class="wrapper">
      <div class="video-container">
        <video v-show="!isImageCaptured" id="video" ref="video" width="300" height="400" autoplay playsinline ></video>
        <canvas v-show="isImageCaptured" id="canvas" ref="canvas" width="300" height="400" ></canvas>
      </div>
       <button v-if="!isImageCaptured" class="capture-btn" @click="captureImage" >
        <span>Capture</span>
       </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Camera',
  data () {
    return {
      isImageCaptured: false
    }
  },
  created: function () {
    const userMedia = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facinMode: 'environment'
      }
    })
    userMedia.then(function (stream) {
      const video = document.getElementById('video')
      video.srcObject = stream
    }).catch(function (error) {
      console.error(error.message)
    })
  },
  methods: {
    captureImage: function () {
      this.isImageCaptured = true
      const context = this.$refs.canvas.getContext('2d')
      const myImage = this.$refs.video
      context.drawImage(myImage, 0, 0, 300, 400)
      const tracks = this.$refs.video.srcObject.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      const img = document.getElementById('canvas').toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
      this.$emit('captured', img)
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
  canvas {
    transform: rotateY(180deg);
    -webkit-transform: rotateY(180deg);
  }
  .capture-btn {
    font-size: 5vw !important;
    width: 30vw !important;
    height: 15vw !important;
    padding: 2vw !important;
    color: white;
    background-color: black;
}
</style>
