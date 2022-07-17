<template>
  <div class="calendar">
    <div class="pa-5">
      <v-row>
        <v-col cols="12" md="6" class="mb-4">
          <v-sheet
            tile
            height="54"
            class="d-flex"
          >
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.prev()"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div class="align-a-center">{{ calendarTitle }}</div>
            <v-spacer></v-spacer>
            <v-btn
              icon
              class="ma-2"
              @click="$refs.calendar.next()"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet height="400">
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
              :event-height=18
              @change="getEvents"
              @click:date="clickDay"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <record-dialog
      :recordData="recordData"
      :isOpenDialog="isOpenRecordDialog"
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
      recordData: {}
    }
  },
  computed: {
    calendarTitle () { // ex) 2022년 6월
      return DateUtils.convertKorDateFromDash(this.monthlyValue).substring(0, 9)
    }
  },
  methods: {
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
    clickDay (date) {
      this.openRecordDialog(date.date)
    },
    openRecordDialog (date) {
      // dialog open (ji)
      this.$startLoading()
      const userKey = 'test'
      const recordRef = ref(this.$database, 'users/' + userKey + '/record/' + date)
      get(recordRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.isOpenRecordDialog = true
          this.recordData = snapshot.val()
          this.recordData.targetDate = date
        } else {
          alert('해당 날짜에 데이터가 존재하지 않습니다.')
        }
        this.$endLoading()
      }).catch((error) => {
        this.$endLoading()
        console.error(error)
      })
    },
    closeRecordDialog () {
      this.isOpenRecordDialog = false
      this.recordData = {}
    },
    getDate (curTime) {
      var newDate = new Date()
      var currentTime = new Date(newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + '-' + curTime + ':00')
      return currentTime
    }
  },
  created () {
    this.monthlyValue = this.today // 초기 캘린더 날짜 설정
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/_color.scss';
::v-deep .v-calendar .v-event{
  width: 100% !important;
  color: gray !important;
}
</style>
