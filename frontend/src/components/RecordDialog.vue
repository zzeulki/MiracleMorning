<template>
  <v-dialog
    v-model="isOpenDialog"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card class="dialog-card">
      <div class="align-y-center dialog-header-box p-a-0">
        <v-spacer></v-spacer>
        <div class="width-vw-5 align-x-right">
          <v-btn
            depressed
            dark
            fab
            class="close-icon-btn"
            @click="$emit('closeDialog')"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="dialog-content-box">
        <!-- <div class="align-x-right align-y-center m-b-vw-5 location-box">
          <div class="align-a-center"><v-icon class="location-icon">place</v-icon></div>
          <div class="location-title">{{ recordData.location }}</div>
        </div> -->
        <div class="img-box m-b-vw-10 align-a-center">{{ recordData.image }}</div>
        <div class="dialog-content-one-line m-b-vw-5">
          <v-icon color="gray">event</v-icon>
          <v-spacer></v-spacer>
          {{ dateTitle }}
        </div>
        <div class="dialog-content-one-line m-b-vw-5">
          <v-icon color="gray">schedule</v-icon>
          <v-spacer></v-spacer>
          {{ timeTitle }}
        </div>
        <div class="comment-box align-a-center">
          <v-textarea
            v-model="recordData.comment"
            outlined
            rows="6"
            no-resize
            readonly
            hide-details
            :color="keyColor.pink"
          ></v-textarea>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import DateUtils from '../utils/date'
import color from '../styles/variables.scss'

const keyColor = color

export default {
  props: {
    recordData: Object,
    isOpenDialog: Boolean
  },
  data () {
    return {
      userKey: 'test', // 전역에서 구할 것
      keyColor: keyColor
    }
  },
  computed: {
    dialogState: {
      get () {
        return this.isOpenDialog
      },
      set () {}
    },
    dateTitle () {
      if (typeof this.recordData.targetDate !== 'undefined') {
        return DateUtils.convertKorDateFromDash(this.recordData.targetDate)
      } else return ''
    },
    timeTitle () {
      if (typeof this.recordData.time !== 'undefined') {
        return DateUtils.getAMPMTimeFrom24hTime(this.recordData.time)
      } else return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.dialog-card {
  background-color: $key-color-light-pink !important;
}

.dialog-content-box {
  padding: 2.77vw !important;
}

.dialog-header-box {
  // background-color: $key-color-pink;
  height: fit-content;
  padding: 10px;
  padding-bottom: 0;
  font-size: 4.5vw;
  justify-content: space-evenly;
}

.img-box {
  height: 70vw !important;
  border: 1px solid black;
  background-color: black;
  color: white;
}

.comment-box {
  height: fit-content;
  // margin-bottom: calc(15.55vw + 2.77vw + 14vw);
}

.completion-btn-box {
  width: 100%;
  position: fixed;
  bottom: calc(15.55vw + 2.77vw);
  right: 0;
  .completion-btn {
    width: 100%;
    height: 14vw;
    min-height: 30px;
    background-color: $key-color-blue;
    border-radius: 10px;
    font-size: 5vw;
    font-weight: 600;
  }
}

.location-box {
  .location-icon {
    font-size: 1rem !important;
    color: $key-color-blue;
  }
  .location-title {
    font-size: 0.85rem !important;
    color: #656565
  }
}

::v-deep .v-input__control > .v-input__slot > fieldset {
  color: $key-color-pink !important;
  border: 2px solid $key-color-pink !important;
  background-color: white !important;
  border-radius: 10px !important;
}
</style>
