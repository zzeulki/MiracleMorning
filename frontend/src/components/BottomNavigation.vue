<template>
  <v-bottom-navigation
    v-model="naviPosition"
    grow
  >
    <v-btn value="home" @click="movePage('Home')">
      <span>홈</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn value="calendar" @click="movePage('RecordSummary')">
      <span>캘린더</span>
      <v-icon>mdi-calendar</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      naviPosition: 'home'
    }
  },
  methods: {
    movePage (name) {
      if (name !== this.$route.name) this.$router.push({ name: name })
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-btn.v-btn--has-bg {
  background-color: transparent !important;
  height: inherit;
}

.v-item-group.v-bottom-navigation {
  align-items: center;
}

.theme--light.v-btn:hover::before {
  opacity: 0 !important;
}
</style>
