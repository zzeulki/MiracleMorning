<template>
  <div class="calendar" v-if="isFetchedData">
    <div class="pa-3 calendar-box">
      <v-row>
        <v-col cols="12">
          <v-sheet
            tile
            height="13vw"
            class="align-a-center"
          >
            <v-btn
              icon
              @click="$refs.calendar.prev()"
            >
              <v-icon class="arrow-icon">mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div class="align-a-center calendar-title">{{ calendarTitle }}</div>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="$refs.calendar.next()"
            >
              <v-icon class="arrow-icon">mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet>
            <v-calendar
              id='v-calendar'
              ref="calendar"
              v-model="monthlyValue"
              locale="ko"
              :weekdays="weekday"
              :type="type"
              :events="events"
              :show-month-on-first="false"
              :event-more="false"
              :event-height="18"
            >
              <template v-slot:day-label="{ date, day }">
                <div v-if="checkThisMonth(date)" @click="openRecordDialog(date)" class="calendar-date" :style="'background-color: ' + getEventsColor(date)">{{ day }}</div>
                <div v-else>{{ '' }}</div>
              </template>
            </v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <record-dialog
      :recordData.sync="recordData"
      :isOpenDialog="isOpenRecordDialog"
      :typeColor="typeColor"
      @closeDialog="closeRecordDialog"
    ></record-dialog>
  </div>
</template>

<script>
import DateUtils from '../utils/date' // 날짜 형식 변환 utils
import { ref, get } from 'firebase/database'
import RecordDialog from '../components/RecordDialog.vue'

export default {
  name: 'RecordCalendar',
  components: {
    RecordDialog
  },
  data () {
    return {
      type: 'month',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      events: [],
      monthlyValue: '',
      today: DateUtils.getDashDate((new Date())), // YYYY-MM-DD 형식의 오늘 날짜
      selectedDate: '',
      isOpenRecordDialog: false,
      recordData: {
        date: '',
        detail: {
          image: '',
          location: '',
          comment: '',
          time: ''
        },
        type: ''
      },
      basisMilliSec: '',
      typeColor: {
        S: this.$colors.success1,
        F1: this.$colors.fail1,
        F2: this.$colors.fail2,
        F3: this.$colors.fail3
      },
      resultList: [],
      recordDateList: [],
      isFetchedData: true
    }
  },
  computed: {
    calendarTitle () { // ex) 2022년 6월
      return DateUtils.convertKorDateFromDash(this.monthlyValue).substring(0, 9)
    }
  },
  methods: {
    // yj
    getEvents () {
      const events = []
      const userKey = 'test'
      const recordRef = ref(this.$database, 'users/' + userKey + '/record/')
      const targetTimeRef = ref(this.$database, 'users/' + userKey + '/targetTime/')
      var targetTime = ''
      get(targetTimeRef).then((snapshot) => {
        targetTime = snapshot.val()
      })
      get(recordRef).then((snapshot) => {
        var dateArr = Object.keys(snapshot.val())
        var valueArr = Object.values(snapshot.val())
        targetTime = this.getDate(String(targetTime).substring(0, 5))
        for (var i = 0; i < dateArr.length; i++) {
          var currentTime = this.getDate(valueArr[i].time)
          var gapTime = (currentTime.getTime() - targetTime.getTime()) / (1000 * 60) // 분 차이
          if (gapTime < 10) { // 차이가 10분보다 적게 날 시 성공
            events.push({
              name: '성공',
              start: new Date(dateArr[i] + ' 00:00:00'),
              end: new Date(dateArr[i]),
              color: '#C6DCE4',
              timed: false
            })
          } else {
            events.push({
              name: '실패',
              start: new Date(dateArr[i] + ' 00:00:00'),
              end: new Date(dateArr[i]),
              color: '#F2D1D1',
              timed: false
            })
          }
        }
      })
      this.events = events
    },
    getDate (curTime) {
      var newDate = new Date()
      var currentTime = new Date(newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + curTime + ':00')
      return currentTime
    },
    // ji
    checkThisMonth (date) {
      let isValidDate = false
      if (DateUtils.getStartEndDateOfMonth(date).startDate === DateUtils.getStartEndDateOfMonth(this.monthlyValue).startDate) isValidDate = true
      return isValidDate
    },
    getMiracleTime () {
      this.isFetchedData = false
      this.$startLoading()
      const userKey = 'test'
      const targetTimeRef = ref(this.$database, 'users/' + userKey + '/targetTime/')
      get(targetTimeRef).then((snapshot) => {
        this.basisMilliSec = this.getMilliSec(snapshot.val().substring(0, 5))
        this.getResultList()
      })
    },
    getMilliSec (timeString) {
      const miracleHr = DateUtils.getHourMinuteFromTimeString(timeString).hour
      const miraclemin = DateUtils.getHourMinuteFromTimeString(timeString).minute
      return new Date(this.today).setHours(miracleHr, miraclemin, 0, 0)
    },
    getResultList () {
      const userKey = 'test'
      const recordRef = ref(this.$database, 'users/' + userKey + '/record/')
      get(recordRef).then((snapshot) => {
        const response = snapshot.val()
        this.recordDateList = Object.keys(snapshot.val())
        this.recordDateList.forEach((el) => {
          const recordMilliSec = this.getMilliSec(response[el].time)
          const gapMin = (recordMilliSec - this.basisMilliSec) / 1000 / 60
          let type = ''
          if (gapMin <= 10) type = 'S'
          else if (gapMin <= 40) type = 'F1'
          else if (gapMin <= 70) type = 'F2'
          else type = 'F3'
          // this.getEventsNew(el, gapMin)
          this.resultList.push({ date: el, type: type, detail: response[el] })
        })
        this.$endLoading()
        this.isFetchedData = true
      })
    },
    getEventsNew (date, gapMin) {
      let gapContext = ''
      if (gapMin < 0) gapContext = gapMin + '분'
      else gapContext = '+' + gapMin + '분'
      this.events.push({
        name: gapContext,
        start: new Date(date + ' 00:00:00'),
        end: new Date(date),
        color: 'transparent',
        timed: false
      })
    },
    getEventsColor (date) {
      const result = this.resultList.filter((el) => { return el.date === date })[0]
      if (typeof result !== 'undefined') return this.typeColor[result.type]
      else return ''
    },
    openRecordDialog (date) {
      const dateList = this.resultList.map((el) => { return el.date })
      if (dateList.includes(date)) {
        this.isOpenRecordDialog = true
        this.recordData = this.resultList.filter((el) => { return el.date === date })[0]
      } else {
        alert('해당 날짜에 데이터가 존재하지 않습니다.')
      }
    },
    closeRecordDialog () {
      this.isOpenRecordDialog = false
      this.recordData = {
        date: '',
        detail: {
          image: '',
          location: '',
          comment: '',
          time: ''
        },
        type: ''
      }
    }
  },
  created () {
    this.monthlyValue = this.today // 초기 캘린더 날짜 설정
    this.getMiracleTime()
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_color.scss';
::v-deep .v-calendar .v-event{
  // display: none;
  width: 100% !important;
  color: gray !important;
  font-size: 0.3rem !important;
  text-align: center;
  div {
    padding-left: 0 !important;
  }
}

.calendar-box {
  padding-top: 0 !important;
}

.calendar-title {
  font-size: 4.5vw;
}

.arrow-icon {
  font-size: 7vw !important;
}

.calendar-date {
  width: 8vw !important;
  height: 8vw !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 3.5vw;
}

::v-deep .v-calendar-weekly__day-label {
  display: flex;
  justify-content: center;
  margin: 2vw 0 0 0;
}

::v-deep .v-calendar-weekly__head {
  height: 7.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  :first-child {
    color: red !important;
  }
}

::v-deep .v-calendar-weekly__week {
  min-height: 14.5vw !important;
  .v-calendar-weekly__day {
    margin-right: 0 !important;
  }
  .v-calendar-weekly__day:first-child {
    color: red !important;
  }
}

::v-deep .v-calendar-weekly__head-weekday {
  font-size: 3.5vw !important;
  color: black !important;
  border-bottom: #e0e0e0 1px solid;
  border-right: #e0e0e0 1px solid;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
  margin-right: 0 !important;
}

::v-deep .v-btn:hover::before {
  opacity: 0 !important;
}

::v-deep .theme--light.v-calendar-weekly .v-calendar-weekly__day.v-outside {
  .v-event {
    visibility: hidden;
  }
}
</style>
