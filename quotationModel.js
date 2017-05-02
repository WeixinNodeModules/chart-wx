var KLineItemStruct = require('./kLineItemStruct')
var Moment = require('moment')
var Head = require('lodash.head')

const kQuotationSpace = 1 * 60 // second

module.exports = function QuotationModel() {
  this.kLineItems = []
  this.totalDataCount = 0
  this.timings = []
  this.preClose = 0
  this.tradeDate = ''
  this.nextTradeDateStartTime = ''

  //数据更新
  this.updateInfo = function(quotationInfo = {
    totalDataCount = 0,
    timings = [],
    preClose = 0,
    tradeDate = '',
    nextTradeDateStartTime = ''
  }) {
    this.totalDataCount = quotationInfo.totalDataCount || 0
    this.timings = quotationInfo.timings || [] //Array<Array<Number, Number>>
    this.preClose = quotationInfo.preClose || 0
    this.tradeDate = quotationInfo.tradeDate || ''
    this.nextTradeDateStartTime = quotationInfo.nextTradeDateStartTime || ''

    this.firstTime = Moment.timestampWithTimeString(this.tradeDate) //String: timeStamp
    this.maxClose = Math.max() //Number
    this.minClose = Math.min() //Number
  }

  this.updateDatas = function(newKLineItems) {
    this._shouldUpdate() && this._updateKLineDatas(newKLineItems)
  }

  this._updateKLineDatas = function(newKLineItems) {
    for (var i = 0; i < newKLineItems.length; i++) {
      var index = this._indexWithTimeString(newKLineItems[i].updateTime)
      this._updateKLineData(index, newKLineItems[i])
    }
  }

  this._updateKLineData = function(index, newKLineItem) {
    this.kLineItems[index] = newKLineItems
    this.maxClose = Math.max(newKLineItems.close, this.maxClose)
    this.minClose = Math.min(newKLineItems.close, this.minClose)
    this._shouleFillFrontData(newKLineItem) && this._fillFrontQuotation(newKLineItem)
  }

  this._fillFrontQuotation = function(newKLineItem) {
    for (var i = 0; i < this.kLineTimes.length; i++) {
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
    return Head(this.kLineItems) && Head(this.kLineItems).status
  }

  this._isFullData = function() {
    return this.kLineItems.length >= this.totalDataCount
  }
}