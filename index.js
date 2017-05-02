var KLineItemStruct = require('./kLineItemStruct')
var QuotationModel = require('./quotationModel')
var QuotationViewModel = require('./quotationViewModel')
var ChartCanvasModel = require('./chartCanvasModel')
var ChartCanvasViewModel = require('./chartCanvasViewModel')

module.exports = function Chart() {
  //创建画布数据模型 不会变更
  var chartCanvasModel = new ChartCanvasModel()

  //创建行情数据模型 每次有新数据 更新模型
  var quotationModel = new QuotationModel()

  //创建行情视图模型 每次有新数据 更新模型
  var quotationViewModel = new QuotationViewModel(chartCanvasModel)

  //创建画布视图模型 不会变更
  var chartCanvasViewModel = new ChartCanvasViewModel(chartCanvasModel)

  //创建绘图器 每次有新数据 更新绘图操作
  var quotationPainter = new QuotationPainter(chartCanvasViewModel)

  this.updateDatas = function(quotationDataInfo) {
    var datas = quotationDataInfo.datas
    var info = quotationDataInfo.info

    quotationModel.updateInfo(_quotationInfo(info))
    quotationModel.updateDatas(_kLineItems(datas))
    quotationViewModel.updateDatas(quotationModel)
    quotationPainter.updateContext(quotationViewModel)
    quotationPainter.draw()
  }
}

var _quotationInfo = function(info) {
  var totalDataCount = info[totalDataCount]
  var timings = info[timings]
  var preClose = info[preClose]
  var tradeDate = info[tradeDate]
  var nextTradeDateStartTime = info[nextTradeDateStartTime]

  return {
    totalDataCount,
    timings,
    preClose,
    tradeDate,
    nextTradeDateStartTime,
  }
}

var _kLineItems = function(datas) {
  var kLineItems = []
  for (var i = 0; i < datas.length; i++) {
    var currentData = datas[i]
    var kLineItem = new KLineItemStruct({
      open = currentData.open,
      high = currentData.high,
      low = currentData.low,
      close = currentData.close,
      value = currentData.value,
      volume = currentData.volume,
      avg = currentData.avg,
      updateTime = currentData.updateTime,
      status = Boolean(currentData.status),
      preClose = currentData.preClose
    })
    kLineItems.push(kLineItem)
  }
  return kLineItems
}