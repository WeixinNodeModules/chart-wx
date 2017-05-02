var Moment = require('moment/moment')

const kDateFomatterString = 'YYYYMMDD HH:mm'

module.exports = function Moment() {
  this.timestampWithTimeString = function(timeString) {
    var moment = this.momentWithTimeString(timeString)
    var timestamp = this.timestampWithMoment(moment)
    return timestamp
  }

  this.timestampWithMoment = function(moment) {
    var timestamp = Moment.format('x')
    return timestamp
  }

  this.momentWithTimeString = function(timeString) {
    var moment = Moment(timeString, kDateFomatterString)
    return moment
  }
}