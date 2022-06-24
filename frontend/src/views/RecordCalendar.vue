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
              ref="calendar"
              v-model="monthlyValue"
              :weekdays="weekday"
              :type="type"
              :events="events"
              locale="ko"
              @change="getEvents"
              @click:date="clickDay"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DateUtils from '../utils/date' // 날짜 형식 변환 utils
// import * as db from 'firebase/database'
import { getDatabase, ref, onValue } from 'firebase/database'

export default {
  name: 'RecordCalendar',
  data () {
    return {
      type: 'month',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      events: [],
      monthlyValue: '',
      today: DateUtils.getDashDate((new Date()).toISOString()) // YYYY-MM-DD 형식의 오늘 날짜
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
      // 이벤트 예시(성공)
      events.push({
        name: '성공',
        start: new Date('2022-06-15 00:00:00'),
        end: new Date('2022-06-15'),
        color: 'orange',
        timed: false
      })
      // 이벤트 예시(실패)
      events.push({
        name: '실패',
        start: new Date('2022-06-17 00:00:00'),
        end: new Date('2022-06-17'),
        color: 'red',
        timed: false
      })
      this.events = events
    },
    clickDay (date) {
      // 날짜 클릭 시 해당 일자 정보 가지고 오기
      alert('year : ' + date.year +
       ' month : ' + date.month +
       ' day : ' + date.day)
      this.testDbFunc()
    },
    testDbFunc () {
      // firebase realdatabase에서 데이터 가지고 오기
      const db = getDatabase()
      var id = 'test'
      const starCountRef = ref(db, 'users/' + id)
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val()
        alert(data.targetTime)
      })
    }
  },
  created () {
    this.monthlyValue = this.today // 초기 캘린더 날짜 설정
  }
}
</script>

<style lang="scss" scoped>

</style>
