<template>
  <div class="loading-layout align-a-center">
    <v-progress-circular
      :size="100"
      :width="8"
      indeterminate
      :color="keyColor.blue"
    ></v-progress-circular>
  </div>
</template>

<script>
import color from '../styles/variables.scss'

const keyColor = color

export default {
  data () {
    return {
      keyColor: keyColor
    }
  }

}
</script>

<style lang="scss" scoped>
.loading-layout {
  position: absolute;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
