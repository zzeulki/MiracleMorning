
<template>
  <div class='init_account'>
    <h1 style="font-weight:700">{{$route.params.initName}}님</h1>
    <h1 style="font-weight:700; margin-left:10vw;">기적의 시간을</h1>
    <h1 style="font-weight:700; margin-left:20vw;">설정해주세요.</h1>
    <div class="set-timepicker-box m-t-vw-10">
    <vue-timepicker class="timepicker" v-model="timeValue" :minute-interval="5" format="hh:mm A"></vue-timepicker>
    </div>
    <v-btn
        class="completion-set-btn"
        dark
        depressed
        @click="movePage()"
      >완료</v-btn>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import * as db from 'firebase/database'

export default {
  components: {
    VueTimepicker
  },
  name: 'InitSetUp',
  props: {
    initName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      timeValue: {
        hh: '06',
        mm: '00',
        A: 'AM'
      }
    }
  },
  methods: {
    movePage () {
      const time = this.timeValue
      const time_ = time.hh + ':' + time.mm + ' ' + time.A
      db.set(db.ref(this.$database, 'users/' + this.initName), {
        nickName: this.initName,
        targetTime: time_
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_color.scss';
.init_account{
  margin-top:20vh;
  padding:10%;
}
.set-timepicker-box{
  width:100%;
  height:10vh;
  margin-left : 15%;
}
.timepicker{
  height:40px;
}
.vue__time-picker {
    display: inline-block;
    font-size: 1.5em;
    width:9em;
    font-family: sans-serif;
    vertical-align: middle;
}
::v-deep.vue__time-picker input.display-time {
    border: 2px solid $key-color-blue !important;
    width: 8.2em;
    height: 2em;
    padding: 0.2em 1.6em;
    font-size: 1.2em;
    font-weight: 900;
}
.completion-set-btn {
  width: 20%;
  height: 14vw;
  margin-left : 70%;
  min-height: 30px;
  background-color:$key-color-blue !important;
  color : gray;
  border-radius: 10px;
  margin-top : 1em;
  font-size: 5vw;
  font-weight: 600;
}
::v-deep.vue__time-picker .dropdown ul li:not([disabled]).active,
::v-deep.vue__time-picker .dropdown ul li:not([disabled]).active:hover,
::v-deep.vue__time-picker .dropdown ul li:not([disabled]).active:focus,
::v-deep.vue__time-picker-dropdown ul li:not([disabled]).active,
::v-deep.vue__time-picker-dropdown ul li:not([disabled]).active:hover,
::v-deep.vue__time-picker-dropdown ul li:not([disabled]).active:focus {
    background: #21A9BF !important;
    color: #fff;
}

</style>
