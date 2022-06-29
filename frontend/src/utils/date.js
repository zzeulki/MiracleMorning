export default {
  // YYYY-MM-DD > 년월일
  convertKorDateFromDash (dateString) {
    const noDash = dateString.split('-')
    const year = noDash[0]
    const month = noDash[1]
    const day = noDash[2]
    return `${year}년 ${month}월 ${day}일`
  },
  // ISO > YYYY-MM-DD
  getDashDate (dateISOString) {
    return dateISOString.substring(0, 10)
  },
  getAMPMTimeFrom24hTime (timeString) {
    const hour = timeString.substring(0, 2)
    if (hour < 12) return timeString + ' AM'
    else return timeString + ' PM'
  }
}
