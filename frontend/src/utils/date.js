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
    const hour = timeString.substring(0, 2)
    if (hour < 12) return timeString + ' AM'
    else return timeString + ' PM'
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
  }
}
