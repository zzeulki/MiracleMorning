<template>
  <div>
    <!-- Todo: Show Current Time -->
    <clock-view />
    <div class="miracle-morning-btn-box">
      <v-btn class="miracle-morning-btn" @click="movePage('RecordCamera')">오늘의 사진 찍기</v-btn>
    </div>
  </div>
</template>

<script>
import Clock from '../components/Clock.vue'

export default {
  name: 'Home',
  components: {
    'clock-view': Clock
  },
  methods: {
    movePage (name) {
      if (name !== this.$route.name) this.$router.push({ name: name })
    }
  }
}
</script>

<style lang="scss" scoped>
.miracle-morning-btn-box {
  width: 100%;
  position: fixed;
  bottom: calc(15.55vw + 2.77vw);
  right: 0;
  .miracle-morning-btn {
    width: 100%;
    height: 14vw;
    min-height: 30px;
    background-color:dodgerblue;
    border-radius: 50px;
    font-size: 5vw;
    font-weight: 600;
  }
}
</style>
