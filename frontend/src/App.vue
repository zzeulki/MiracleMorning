<template>
  <v-app>
    <progress-bar v-if="isLoading"></progress-bar>
    <div>
      <the-header
        v-if="isVisibleHeader"
        :headerTitle="headerTitle"
        :isVisibleBackBtn="isVisibleBackBtn"
      ></the-header>
      <v-main>
      <transition name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
      <bottom-navigation v-if="isVisibleBottomNavigation"></bottom-navigation>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue'
import TheHeader from './components/Header.vue'
import BottomNavigation from './components/BottomNavigation.vue'
import ProgressBar from './components/ProgressBar.vue'
import eventBus from './utils/eventBus'

// loading
Vue.prototype.$startLoading = () => { eventBus.$emit('startLoading') }
Vue.prototype.$endLoading = () => { eventBus.$emit('endLoading') }

export default {
  name: 'App',
  components: {
    TheHeader,
    BottomNavigation,
    ProgressBar
  },
  data () {
    return {
      isVisibleHeader: false,
      isVisibleBackBtn: false,
      isVisibleBottomNavigation: false,
      headerTitle: '',
      isLoading: false
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
    eventBus.$on('startLoading', () => {
      this.isLoading = true
    })
    eventBus.$on('endLoading', () => {
      this.isLoading = false
    })
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
