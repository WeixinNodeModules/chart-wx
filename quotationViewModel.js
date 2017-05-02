var Percent = require('./utils').percent
var Last = require('lodash.last')

module.exports = function QuotationViewModel(chartCanvasModel) {
  this.chartCanvasModel = chartCanvasModel
  this.meshX = chartCanvasModel.meshFrame.origin.x
  this.meshY = chartCanvasModel.meshFrame.origin.y
  this.meshWidth = chartCanvasModel.meshFrame.size.width
  this.meshHeight = chartCanvasModel.meshFrame.size.height

  this.updateDatas = function(quotationModel) {
    this.quotationModel = quotationModel
    this.totalPriceDistance = _totalPriceDistance(this.quotationModel, this.chartCanvasModel.chartPaddingVertical)
    this.beginPriceValue = this.quotationModel.preClose + this.totalPriceDistance / 2
    this.spacePriceValue = this.totalPriceDistance / this.chartCanvasModel.meshFrame.row

    this.timeStrings = []
    this.timeSections = []
    this._setupTimings(this.quotationModel.timings)
  }

  this.getX = function(index) {
    let scale = index / this.quotationModel.totalDataCount
    return this.meshX + scale * this.meshWidth
  }

  this.getIndex = function(x) {
    let distance = (this.meshX - x)
    let scale = distance / this.meshWidth
    return Math.round(scale * this.quotationModel.totalDataCount)
  }

  this.getY = function(price) {
    let scale = (this.beginPriceValue() - price) / this.totalPriceDistance
    return this.meshY + scale * this.meshHeight
  }

  this.getPrice = function(y) {
    let distance = y - this.meshY
    let scale = distance / this.meshHeight
    return this.beginPriceValue() + scale * this.totalPriceDistance
  }

  this.getPercent = function(y) {
    let price = this.getPrice(y)
    return Percent(price - this.quotationModel.preClose, this.quotationModel.preClose)
  }

  this.getTime = function(index) {
    return this.timeStrings[index]
  }
  this.getTimeX = function(index) {
    return this.timeSections[index]
  }

  this._setupTimings = function(timings) {
    for (var i = 0; i < timings.length; i++) {
      let latestTiming = i > 0 ? Last(timeStrings) + '/' : ''
      this.timeStrings.push(latestTiming + parseInt(timings[i][0] / 60) + ':' + timings[i][0] % 60)
      this.timeStrings.push(parseInt(timings[i][1] / 60) + ':' + timings[i][1] % 60)

      let latestTimeSection = i > 0 ? Last(timeSections) : 0
      this.timeSections.push(this.getX((timings[i][1] - timings[i][0]) + latestTimeSection))
    }
  }
}

_totalPriceDistance = function(quotationModel, paddingVertical) {
  var firstHalf = quotationModel.maxClose - quotationModel.preClose
  var secondHalf = quotationModel.minClose - quotationModel.preClose
  return (Math.max(firstHalf, secondHalf) + paddingVertical) * 2
}