var Percent = require('../utils/math').percent

module.exports = function KLineItemStruct(quotationData) {
  this.open = quotationData.open || 0
  this.high = quotationData.high || 0
  this.low = quotationData.low || 0
  this.close = quotationData.close || 0
  this.value = quotationData.value || 0
  this.volume = quotationData.volume || 0
  this.avg = quotationData.avg || 0
  this.updateTime = quotationData.updateTime || ''
  this.status = quotationData.status || false
  this.preClose = quotationData.preClose || 0

  this.upDrop = this.close - this.preClose
  this.percent = Percent(this.upDrop, this.preClose)
}