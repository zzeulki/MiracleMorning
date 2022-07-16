<template>
  <camera-view v-on:sendImage="movePage('RecordDetail')"></camera-view>
</template>

<script>
import Camera from '../components/Camera.vue'
import eventBus from '../utils/eventBus'
import dateUtils from '../utils/date'

let myimage = ''
export default {
  name: 'RecordCamera',
  data () {
    return {
      currentDate: '',
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
    movePage (name) {
      const today = new Date()
      this.currentDate = dateUtils.getDashDate(today)
      this.currentTime = dateUtils.getSimpleTime(today)
      if (name !== this.$route.name) {
        this.$router.push(
          { name: name, params: { image: myimage, currentDate: this.currentDate, currentTime: this.currentTime, currentLocation: this.currentLocation } })
      }
    }
  },
  mounted: function () {
    eventBus.$on('captured', function (img) {
      myimage = img
    })
    navigator.geolocation.getCurrentPosition(pos => {
      this.currentLocation.latitude = pos.coords.latitude
      this.currentLocation.longitude = pos.coords.longitude
    })
  }
}
</script>

<style>

</style>
