var IsNumber = require('lodash.IsNumber')
var Moment = require('moment')
var Percent = require('percent')

module.exports = function KLineItemStruct(quotationData = {
  open = 0,
  high = 0,
  low = 0,
  close = 0,
  value = 0,
  volume = 0,
  avg = 0,
  updateTime = '',
  status = false,
  preClose = 0
}) {
  this.open = quotationData.open
  this.high = quotationData.high
  this.low = quotationData.low
  this.close = quotationData.close
  this.value = quotationData.value
  this.volume = quotationData.volume
  this.avg = quotationData.avg
  this.updateTime = quotationData.updateTime
  this.status = quotationData.status
  this.preClose = quotationData.preClose

  this.upDrop = this.close - this.preClose
  this.percent = Percent(this.upDrop, this.preClose)
}