var KLineItemStruct = require('./kLineItemStruct')
var Moment = require('./moment')

const kQuotationSpace = 1 * 60 // second

module.exports = function QuotationModel() {
  this.init = function() {
      this.kLineItems = []
      this.totalDataCount = 0
      this.decimalCount = 0
      this.timings = []
      this.preClose = 0
      this.tradeDate = ''
      this.nextTradeDateStartTime = ''
      this.maxClose = Math.max() //Number
      this.minClose = Math.min() //Number
    }
    //数据更新
  this.updateInfo = function(quotationInfo = {
    totalDataCount: 0,
    decimalCount: 0,
    timings: [],
    preClose: 0,
    tradeDate: '',
    nextTradeDateStartTime: ''
  }) {
    this.totalDataCount = quotationInfo.totalDataCount || 0
    this.decimalCount = quotationInfo.decimalCount || 0
    this.timings = quotationInfo.timings || [] //Array<Array<Number, Number>>
    this.preClose = quotationInfo.preClose || 0
    this.tradeDate = quotationInfo.tradeDate || ''
    this.nextTradeDateStartTime = quotationInfo.nextTradeDateStartTime || ''

    this.firstTime = this._firstTime() //String: timeStamp
  }

  this._firstTime = function() {
    let dateSecond = Moment.timestampWithTimeString(this.tradeDate)
    let timeSecond = this.timings[0][0] * 60
    return String(parseInt(dateSecond) + parseInt(timeSecond))
  }

  this.updateDatas = function(newKLineItems) {
    this._shouldUpdate(newKLineItems) && this._updateKLineDatas(newKLineItems)
  }

  this._updateKLineDatas = function(newKLineItems) {
    for (var i = 0; i < newKLineItems.length; i++) {
      var index = this._indexWithTimeString(newKLineItems[i].updateTime)
      this._updateKLineData(index, newKLineItems[i])
    }
  }

  this._updateKLineData = function(index, newKLineItem) {
    newKLineItem = this._avaiableKLineItem(index, newKLineItem)
    this.kLineItems[index] = newKLineItem
    if (newKLineItem.status) {
      this.maxClose = Math.max(newKLineItem.close, this.maxClose)
      this.minClose = Math.min(newKLineItem.close, this.minClose)
    }
    this._shouleFillFrontData(newKLineItem) && this._fillFrontQuotation(newKLineItem)
  }

  this._avaiableKLineItem = function(index, newKLineItem) {
    if (newKLineItem.status || index == 0) {
      return newKLineItem
    } else {
      var item = this.kLineItems[index - 1]
      newKLineItem.open = item.open
      newKLineItem.high = item.high
      newKLineItem.low = item.low
      newKLineItem.close = item.close
      newKLineItem.value = item.value
      newKLineItem.volume = item.volume
      newKLineItem.avg = item.avg
      newKLineItem.status = Boolean(item.status)
      newKLineItem.preClose = item.preClose
      newKLineItem.percent = item.percent
      newKLineItem.upDrop = item.upDrop
      return newKLineItem
    }
  }

  this._fillFrontQuotation = function(newKLineItem) {
    for (var i = 0; i < this.kLineItems.length; i++) {
      this.kLineItems[i] = newKLineItem
    }
  }

  //格式转换
  this._indexWithTimeString = function(timeString) {
    return (Moment.timestampWithTimeString(timeString) - this.firstTime) / kQuotationSpace
  }

  //操作判断
  this._shouldUpdate = function(newKLineItems) {
    return newKLineItems.length > 0 && !this._isFullData()
  }

  this._shouleFillFrontData = function(newKLineItem) {
    return newKLineItem.status && !this._isFirstKLineItemValid()
  }

  //数据判断
  this._isFirstKLineItemValid = function() {
    return this.kLineItems[0] && this.kLineItems[0].status
  }

  this._isFullData = function() {
    return this.kLineItems.length >= this.totalDataCount
  }
}