export default {
  // YYYY-MM-DD > 년월일
  convertKorDateFromDash (dateString) {
    const noDash = dateString.split('-')
    const year = noDash[0]
    const month = noDash[1]
    const day = noDash[2]
    return `${year}년 ${month}월 ${day}일`
  },
  // date > YYYY-MM-DD
  getDashDate (date) {
    const offset = date.getTimezoneOffset() * 60000
    const dateOffset = new Date(date.getTime() - offset)
    return dateOffset.toISOString().substring(0, 10)
  },
  getAMPMTimeFrom24hTime (timeString) {
    const time = timeString.split(':')
    let hour = time[0]
    const minute = time[1]
    let timeType = ' AM'
    if (parseInt(hour) > 12) {
      hour = hour - 12
      timeType = ' PM'
    }
    hour = hour < 10 ? `${hour}`.padStart(2, 0) : hour
    return hour + ':' + minute + timeType
  },
  // HH:MM
  getSimpleTime (timeString) {
    let hrs = timeString.getHours()
    let min = timeString.getMinutes()
    hrs = hrs < 10 ? `${hrs}`.padStart(2, 0) : hrs
    min = min < 10 ? `${min}`.padStart(2, 0) : min
    this.hrs = hrs
    this.min = min
    return hrs + ':' + min
  },
  getStartEndDateOfMonth (dateString) {
    const noDash = dateString.split('-')
    const month = noDash[1]
    const year = noDash[0]
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    return { startDate: this.getDashDate(startDate), endDate: this.getDashDate(endDate) }
  },
  getHourMinuteFromTimeString (timeString) {
    const time = timeString.split(':')
    const hour = time[0]
    const minute = time[1]
    return { hour: parseInt(hour), minute: parseInt(minute) }
  }
}
