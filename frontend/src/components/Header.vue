<template>
  <v-layout class="header-box">
    <v-flex xs2 class="back-btn-box">
      <v-btn class="back-btn" v-if="isVisibleBackBtn" @click="goBack()"><v-icon>arrow_back_ios</v-icon></v-btn>
    </v-flex>
    <v-flex xs8 class="header-text">{{ headerTitle }}</v-flex>
    <v-flex xs2></v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    isVisibleHeader: Boolean,
    isVisibleBackBtn: Boolean,
    headerTitle: String
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped style="scss">
.header-box {
  height: 15.55vw;
  flex: initial !important;
  border-bottom: 1px solid rgba(0, 0 ,0 , 0.2)
}

.back-btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-btn {
  width: 10vw !important;
  min-width: 0 !important;
  padding: 1vw !important;
  background-color: transparent !important;
  box-shadow: none;
}

.header-text {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
