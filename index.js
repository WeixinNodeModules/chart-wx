var KLineItemStruct = require('./model/kLineItemStruct')
var QuotationModel = require('./model/quotationModel')
var ChartCanvasModel = require('./model/chartCanvasModel')
var QuotationViewModel = require('./viewModel/quotationViewModel')
var ChartCanvasViewModel = require('./viewModel/chartCanvasViewModel')
var QuotationPainter = require('./painter/quotationPainter')


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
    this.quotationModel.updateDatas(_kLineItems(kLineItems, quotationInfo.preClose, quotationInfo.decimalCount))
    this.quotationViewModel.updateDatas(this.quotationModel)
    this.quotationPainter.updateDatas(this.quotationViewModel)
  }

  this.drawAxis = function(point) {
    var avaiablePoint = this.quotationViewModel.getAvaiablePoint(point)
    var kLineItem = this.quotationViewModel.searchKLineItem(avaiablePoint)
    this.quotationPainter.drawAxis(avaiablePoint, kLineItem)
    return kLineItem
  }

  this.clearAxis = function() {
    this.quotationPainter.clearAxis()
  }
}

var _kLineItems = function(datas, preClose, decimalCount) {
  var kLineItems = []
  for (var i = 0; i < datas.length; i++) {
    var currentData = datas[i]
    var kLineItem = new KLineItemStruct({
      open: Number(currentData.open).toFixed(decimalCount),
      high: Number(currentData.high).toFixed(decimalCount),
      low: Number(currentData.low).toFixed(decimalCount),
      close: Number(currentData.close).toFixed(decimalCount),
      preClose: Number(preClose).toFixed(decimalCount),
      avg: Number(currentData.avg).toFixed(decimalCount),
      value: currentData.value,
      volume: currentData.volume,
      updateTime: currentData.updatetime,
      status: Boolean(currentData.status),
    })
    kLineItems.push(kLineItem)
  }
  return kLineItems
}