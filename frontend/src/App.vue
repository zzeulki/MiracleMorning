<template>
    <v-app>
      <the-header
        v-if="isVisibleHeader"
        :headerTitle="headerTitle"
        :isVisibleBackBtn="isVisibleBackBtn"
      ></the-header>
      <v-main>
      <transition name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
      </v-main>
      <bottom-navigation v-if="isVisibleBottomNavigation"></bottom-navigation>
    </v-app>
</template>

<script>
import TheHeader from './components/Header.vue'
import BottomNavigation from './components/BottomNavigation.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    BottomNavigation
  },
  data () {
    return {
      isVisibleHeader: false,
      isVisibleBackBtn: false,
      isVisibleBottomNavigation: false,
      headerTitle: ''
    }
  },
  watch: {
    $route () {
      this.initMethod()
    }
  },
  methods: {
    initMethod () {
      this.isVisibleHeader = this.$route.meta.isVisibleHeader
      this.isVisibleBackBtn = this.$route.meta.isVisibleBackBtn
      this.isVisibleBottomNavigation = this.$route.meta.isVisibleBottomNavigation
      this.headerTitle = this.$route.meta.title
    }
  },
  created () {
    this.initMethod()
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-actvive {
  transition: all 0.4s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
