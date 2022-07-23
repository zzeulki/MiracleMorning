<template>
  <div class="all-layout p-a-vw-10">
    <!-- 사진, 코멘트 기록 확인 화면(ji) -->
    <div class="contents-box">
      <!-- <div class="align-x-right align-y-center m-b-vw-5 location-box">
        <div class="align-a-center"><v-icon class="location-icon">place</v-icon></div>
        <div class="location-title">{{ location }}</div>
      </div> -->
      <v-layout column>
        <div class="m-b-vw-10 align-a-center">
          <img id="image" width="100%" />
        </div>
        <div class="subtitle">
          <div class="text-bold width-p-20">날짜</div>
          <div>{{ dateTitle }}</div>
        </div>
        <v-divider></v-divider>
        <div class="subtitle">
          <div class="text-bold width-p-20">시간</div>
          <div>{{ timeTitle }}</div>
        </div>
        <v-divider></v-divider>
        <div class="align-x-center">
          <div class="text-bold width-p-20 subtitle">메모</div>
          <div class="comment-box width-p-80 align-a-center m-t-5">
            <v-textarea
              v-model="comment"
              outlined
              rows="6"
              no-resize
              placeholder="내용을 입력하세요."
              counter
              :rules="rules.maxLength"
              :color="'#C6DCE4'"
            ></v-textarea>
          </div>
        </div>
      </v-layout>
    </div>
    <div class="completion-btn-box p-x-vw-10">
      <v-btn
        :disabled="!isContentReady ? true : false "
        class="completion-btn"
        depressed
        @click="saveRecord()"
      >완료</v-btn>
    </div>
  </div>
</template>

<script>
import { ref, set } from 'firebase/database'
import DateUtils from '../utils/date'

export default {
  name: 'RecordDetail',
  data () {
    return {
      recordDate: '', // 전달받아야 할 것
      base64Image: '', // 전달받아야 할 것
      location: {
        latitude: '',
        longitude: ''
      },
      time: '', // 전달받아야 할 것
      comment: '',
      userKey: 'test', // 전역에서 구할 것
      rules: {
        maxLength: [value => value.length <= 200 || '200자까지 입력 가능합니다.']
      },
      isRecordDialog: false
    }
  },
  props: {
    image: {
      type: String,
      default: ''
    },
    currentDate: {
      type: String,
      default: ''
    },
    currentTime: {
      type: String,
      default: ''
    },
    currentLocation: {
      type: Object,
      default: () => {
        return {
          latitude: '',
          longitude: ''
        }
      }
    }
  },
  mounted: function () {
    this.base64Image = this.$route.params.image
    this.recordDate = this.$route.params.currentDate
    this.time = this.$route.params.currentTime
    this.location = this.$route.params.currentLocation
    document.getElementById('image').src = this.base64Image
  },
  computed: {
    isContentReady () {
      if (this.userKey === '' || this.recordDate === '' || this.base64Image === '' || this.location === '' || this.time === '') return false
      else return true
    },
    dateTitle () {
      return this.recordDate
    },
    timeTitle () {
      return DateUtils.getAMPMTimeFrom24hTime(this.time)
    }
  },
  methods: {
    saveRecord () {
      if (this.isContentReady) {
        this.$startLoading()
        const recordDateRef = ref(this.$database, 'users/' + this.userKey + '/record/' + this.recordDate)
        set(recordDateRef, {
          time: this.time,
          image: this.base64Image,
          comment: this.comment,
          location: this.location
        }).then(() => {
          this.$endLoading()
          this.$router.push({ name: 'Home' })
        }).catch((error) => {
          this.$endLoading()
          console.log(error)
        })
      } else {
        alert('오류가 발생했습니다. 관리자에게 문의해주세요.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_color.scss';

.all-layout {
  width: 100%;
  max-height: fit-content;

  .contents-box {
    font-size: 3.8vw;
  }

  .comment-box {
    height: fit-content;
    margin-bottom: calc(15.55vw + 2.77vw + 14vw);
    ::v-deep .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
      font-size: 3.8vw !important;
    }

    ::v-deep .v-textarea textarea {
      line-height: 1.2rem;
      margin: 2vw 0 !important;
    }

    ::v-deep .v-text-field__details {
      margin-top: -5px;
    }

    ::v-deep .v-counter {
      font-size: 3vw;
    }
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
      background-color: $blue-success-1;
      border-radius: 10px;
      font-size: 5vw;
      font-weight: 600;
    }
  }
}

.v-card__actions {
  padding: 0 !important;
}

.dialog-content-box {
  padding: 2.77vw !important;
}

.dialog-header-box {
  height: 15.55vw;
  font-size: 4.5vw;
}

.location-box {
  .location-icon {
    font-size: 1rem !important;
    color: $key-color-blue;
  }
  .location-title {
    font-size: 0.85rem !important;
    color: gray;
  }
}

::v-deep .v-input__control > .v-input__slot > fieldset {
  color: $key-color-blue !important;
  border: 2px solid $key-color-blue !important;
}
</style>
