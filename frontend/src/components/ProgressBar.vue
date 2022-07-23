<template>
  <div class="loading-layout align-a-center">
    <v-progress-circular
      :size="60"
      :width="7"
      indeterminate
      :color="'#C6DCE4'"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
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
