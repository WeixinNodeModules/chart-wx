var Percent = require('./utils').percent

module.exports = function QuotationViewModel(chartCanvasModel) {
  this.chartCanvasModel = chartCanvasModel
  this.meshX = chartCanvasModel.meshFrame.origin.x
  this.meshY = chartCanvasModel.meshFrame.origin.y
  this.meshWidth = chartCanvasModel.meshFrame.size.width
  this.meshHeight = chartCanvasModel.meshFrame.size.height
  this.timeStrings = []
  this.timeSections = []

  this.updateDatas = function(quotationModel) {
    this.quotationModel = quotationModel
    this.totalPriceDistance = this._totalPriceDistance(this.quotationModel, this.chartCanvasModel.chartFrame.chartPaddingVertical)
    this.beginPriceValue = this.quotationModel.preClose + this.totalPriceDistance / 2

    this._setupTimings(this.quotationModel.timings)
  }

  this.getHorizantalLength = function(index) {
    let scale = index / this.quotationModel.totalDataCount
    scale = Math.max(Math.min(1, scale), 0)
    return scale * this.meshWidth
  }

  this.getX = function(index) {
    return this.meshX + this.getHorizantalLength(index)
  }

  this.getIndex = function(x) {
    let scale = distance / this.meshWidth
    return Math.round(scale * this.quotationModel.totalDataCount)
  }

  this.getY = function(price) {
    let scale = (this.beginPriceValue - price) / this.totalPriceDistance
    scale = Math.max(Math.min(1, scale), 0)
    return this.meshY + scale * this.meshHeight
  }

  this.getPrice = function(y) {
    let distance = y - this.meshY
    let scale = distance / this.meshHeight
    let price = this.beginPriceValue - scale * this.totalPriceDistance
    return price.toFixed(this.quotationModel.decimalCount)
  }

  this.getPercent = function(y) {
    let price = this.getPrice(y)
    let percent = Percent(Math.abs(price - this.quotationModel.preClose), this.quotationModel.preClose)
    return percent
  }

  this._timeString = function(timing) {
    let hour = parseInt(timing / 60)
    let minute = timing % 60 || '00'
    return hour + ':' + minute
  }

  this._setupTimings = function(timings) {
    let timeStrings = []
    let timeSections = [this.meshX]
    let latestTiming = ''
    for (var i = 0; i < timings.length; i++) {
      latestTiming = i > 0 ? latestTiming + '/' : ''
      timeStrings.push(latestTiming + this._timeString(timings[i][0]))
      latestTiming = this._timeString(timings[i][1])

      let latestTimeSection = timeSections[timeSections.length - 1] || 0
      timeSections.push(this.getHorizantalLength(timings[i][1] - timings[i][0]) + latestTimeSection)
    }
    timeStrings.push(latestTiming)
    this.timeStrings = timeStrings
    this.timeSections = timeSections
  }

  this._totalPriceDistance = function(quotationModel, paddingVertical) {
    var preClose = quotationModel.preClose
    var maxClose = quotationModel.maxClose == Math.max() ? preClose * (1 + 0.01) : quotationModel.maxClose
    var minClose = quotationModel.minClose == Math.min() ? preClose * (1 - 0.01) : quotationModel.minClose
    var firstHalf = Math.abs(maxClose - preClose)
    var secondHalf = Math.abs(minClose - preClose)
    var totalPriceDistance = Math.max(firstHalf, secondHalf) * 2
    var scale = this.meshHeight / (this.meshHeight - paddingVertical * 2)
    return totalPriceDistance * scale
  }
}