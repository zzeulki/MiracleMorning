<template>
  <v-dialog
    v-model="isOpenDialog"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card class="dialog-card">
      <div class="align-a-center dialog-header-box">
        <v-icon class="m-l-vw-5 sentimation-icon" :color="getTypeStyle(this.recordData.type).color">{{ getTypeStyle(this.recordData.type).icon }}</v-icon>
        <div class="m-l-vw-10 text-bold">{{ dateTitle }}</div>
        <v-spacer></v-spacer>
        <div class="align-x-right">
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
      <div class="align-a-center p-x-vw-16">
        <!-- <v-divider :style="'border-color: ' + getTypeStyle(this.recordData.type).color"></v-divider> -->
        <v-divider></v-divider>
      </div>
      <div class="dialog-content-box">
        <!-- <div class="align-x-right align-y-center m-b-vw-5 location-box">
          <div class="align-a-center"><v-icon class="location-icon">place</v-icon></div>
          <div class="location-title">{{ recordData.location }}</div>
        </div> -->
        <div class="align-y-center m-t-vw-5">
          <v-spacer></v-spacer>
          <div class="time-box">{{ timeTitle }}</div>
        </div>
        <div class="m-b-vw-10 align-a-center">
          <img v-if="recordData.detail.image && recordData.detail.image.includes('base64')" :src="recordData.detail.image" width="100%">
          <div v-else><v-icon>no_photography</v-icon></div>
        </div>
        <div :style="'border-radius: 3vw; border: 1px solid' + getTypeStyle(this.recordData.type).color">
          <div class="comment-box align-a-center">
            <v-textarea
              v-model="recordData.detail.comment"
              outlined
              rows="6"
              no-resize
              readonly
              hide-details
            ></v-textarea>
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import DateUtils from '../utils/date'

export default {
  props: {
    recordData: Object,
    isOpenDialog: Boolean,
    typeColor: Object
  },
  data () {
    return {
      userKey: 'test' // 전역에서 구할 것
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
      if (typeof this.recordData.date !== 'undefined') {
        return DateUtils.convertKorDateFromDash(this.recordData.date)
      } else return ''
    },
    timeTitle () {
      if (typeof this.recordData.detail.time !== 'undefined') {
        return DateUtils.getAMPMTimeFrom24hTime(this.recordData.detail.time)
      } else return ''
    }
  },
  methods: {
    getTypeStyle (type) {
      const style = {
        color: '',
        icon: ''
      }
      if (type === 'S') {
        style.color = this.typeColor[type]
        style.icon = 'sentiment_very_satisfied'
      } else {
        style.color = this.typeColor.F1
        if (type === 'F1') style.icon = 'sentiment_neutral'
        else if (type === 'F2') style.icon = 'sentiment_dissatisfied'
        else style.icon = 'sentiment_very_dissatisfied'
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_color.scss';
.dialog-card {
  font-size: 4.3vw !important;
}

.dialog-content-box {
  padding: 4.44vw !important;
  padding-top: 0 !important;
}

.dialog-header-box {
  height: fit-content;
  padding: 2.77vw 4.44vw;
  font-size: 4.8vw;
  justify-content: space-evenly;
}

.time-box {
  font-size: 3.8vw;
}

.sentimation-icon {
  font-size: 6.5vw;
}

.comment-box {
  height: fit-content;
  ::v-deep .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
    font-size: 3.8vw !important;
  }

  ::v-deep .v-textarea textarea {
    line-height: 1.2rem;
    margin: 2vw 0 !important;
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
  border: none !important;
  background-color: transparent !important;
  border-radius: 2vw !important;
}
</style>
