<template>
  <div class="home">
    <video id="video" autoplay playsinline></video>
    <input type="file" accept="image/*" capture="camera" />
    <button>촬영</button>
  </div>
</template>

<script>
const userMedia = navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    width: 640,
    height: 480,
    facinMode: 'environment'
  }
})
userMedia.then(function (stream) {
  const videoEl = document.getElementById('video')
  const videoTracks = stream.getVideoTracks()[0]
  console.log('cccc : ' + videoTracks.label)
  videoEl.srcObject = stream
}).catch(function (error) {
  console.error(error.message)
})
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      showCamera: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
