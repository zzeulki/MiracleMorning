<template>
  <div>
    <!-- Todo: Show Current Time -->
    <clock-view />
    <div class="miracle-morning-btn-box p-x-vw-10">
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
@import '@/styles/_color.scss';

.miracle-morning-btn-box {
  width: 100%;
  position: fixed;
  bottom: calc(15.55vw + 2.77vw);
  right: 0;
  .miracle-morning-btn {
    width: 100%;
    height: 14vw;
    min-height: 30px;
    background-color: $blue-success-1;
    border-radius: 10px;
    font-size: 5vw;
    font-weight: 600;
  }
}
</style>
