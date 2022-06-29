<template>
    <camera-view v-on:captured="movePage(img)"></camera-view>
</template>

<script>
import Camera from '../components/Camera.vue'

export default {
  name: 'RecordCamera',
  data () {
    return {
      img: '',
      currentTime: '',
      currentLocation: {
        latitude: '',
        longitude: ''
      }
    }
  },
  components: {
    'camera-view': Camera
  },
  methods: {
    movePage (name, img) {
      this.img = img
      this.currentTime = new Date()
      navigator.geolocation.getCurrentPosition(pos => {
        this.latitude = pos.coords.latitude
        this.longitude = pos.coords.longitude
      })
      console.log(this.currentTime)
      console.log(this.currentLocation)
      console.log('show RecordDetailView')
      // if (name !== this.$route.name) this.$router.push({ name: name, params: { imgage: img } })
    }
  }
}
</script>

<style>

</style>
