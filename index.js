var QuotationModel = require('./quotationModel')
var QuotationViewModel = require('./quotationViewModel')
var QuotationPainter = require('./quotationPainter')
var ChartCanvasModel = require('./chartCanvasModel')
var ChartCanvasViewModel = require('./chartCanvasViewModel')
var KLineItemStruct = require('./kLineItemStruct')

module.exports = function Chart() {
  //创建画布数据模型 不会变更
  this.chartCanvasModel = new ChartCanvasModel()

  //创建画布视图模型 不会变更
  this.chartCanvasViewModel = new ChartCanvasViewModel(this.chartCanvasModel)

  //创建行情数据模型 每次有新数据 更新模型
  this.quotationModel = new QuotationModel()

  //创建行情视图模型 每次有新数据 更新模型
  this.quotationViewModel = new QuotationViewModel(this.chartCanvasModel)

  //创建绘图器 每次有新数据 更新绘图操作
  this.quotationPainter = new QuotationPainter(this.chartCanvasViewModel)

  this.init = function() {
    this.quotationModel.init()
    this.quotationPainter.init()
  }

  this.updateDatas = function(quotationDataInfo) {
    var kLineItems = quotationDataInfo.datas
    var quotationInfo = quotationDataInfo.info
    if (quotationInfo.tradeDate != this.quotationModel.tradeDate) {
      this.quotationModel.init()
      this.quotationModel.updateInfo(quotationInfo)
    }
    this.quotationModel.updateDatas(_kLineItems(kLineItems, quotationInfo.preClose))
    this.quotationViewModel.updateDatas(this.quotationModel)
    this.quotationPainter.updateDatas(this.quotationViewModel)
  }
}

var _kLineItems = function(datas, preClose) {
  var kLineItems = []
  for (var i = 0; i < datas.length; i++) {
    var currentData = datas[i]
    var kLineItem = new KLineItemStruct({
      open: currentData.open,
      high: currentData.high,
      low: currentData.low,
      close: currentData.close,
      value: currentData.value,
      volume: currentData.volume,
      avg: currentData.avg,
      updateTime: currentData.updatetime,
      status: Boolean(currentData.status),
      preClose: preClose
    })
    kLineItems.push(kLineItem)
  }
  return kLineItems
}