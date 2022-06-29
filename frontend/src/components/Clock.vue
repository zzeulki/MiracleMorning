<template>
  <div class="clock-container">
    <div class="date">
      <div class="month">{{ mon }}</div>
      <div class="divider">월</div>
      <div class="day">{{ day }}</div>
      <div class="space">일</div>
      <div class="day-of-the-week">({{ dow }})</div>
    </div>
    <div class="clock">
      <div class="hours">{{ hrs }}</div>
      <div class="divider">:</div>
      <div class="minutes">{{ min }}</div>
      <div class="divider">:</div>
      <div class="seconds">{{ sec }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data () {
    return {
      hrs: 10,
      min: 10,
      sec: 10,
      mon: 1,
      day: 1,
      dow: 1
    }
  },
  created () {
    const date = new Date()
    console.log(date)
    this.mon = date.getMonth() + 1
    this.day = date.getDate()
    const week = ['일', '월', '화', '수', '목', '금', '토']
    this.dow = week[date.getDay()]
    this.setTime()
    setInterval(() => this.setTime(), 1000)
  },
  methods: {
    setTime () {
      const date = new Date()
      let hrs = date.getHours()
      let min = date.getMinutes()
      let sec = date.getSeconds()
      hrs = hrs < 10 ? `${hrs}`.padStart(2, 0) : hrs
      min = min < 10 ? `${min}`.padStart(2, 0) : min
      sec = sec < 10 ? `${sec}`.padStart(2, 0) : sec
      this.hrs = hrs
      this.min = min
      this.sec = sec
    }
  }
}
</script>

<style>
.clock-container > div {
  display: flex;
}
.clock-container > div {
  font-size: 30px;
}
</style>
