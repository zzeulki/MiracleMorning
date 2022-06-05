
<template>
  <div class='init_account'>
    <h1 name='set-name' style="font-weight:700"> XXXX 님</h1>
    <h1 style="font-weight:700; margin-left:10vw;">기적의 시간을</h1>
    <h1 style="font-weight:700; margin-left:20vw;">설정해주세요.</h1>
    <div class="set-timepicker-box">
    <vue-timepicker class="timepicker" v-model="timeValue" :minute-interval="5" format="HH:mm"></vue-timepicker>
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
import VueTimepicker from 'vue2-timepicker'
export default {
  components: { VueTimepicker },
  data () {
    return {
      timeValue: {
        HH: '06',
        mm: '00'
      }
    }
  }
}
</script>

<style>
.init_account{
  margin-top:20vh;
  padding:10%;
}
.set-timepicker-box{
  width:100%;
  height:10vh;
  margin-left : 20%;
}
.timepicker{
  width:100%;
  height:40px;
}
.completion-set-btn {
  width: 20%;
  height: 14vw;
  margin-left : 70%;
  min-height: 30px;
  background-color:dodgerblue;
  border-radius: 10px;
  font-size: 5vw;
  font-weight: 600;
}

</style>
