var ChartStyles = require('./chartStyles')
var ChartCanvasIds = require('./chartCanvasIds')

module.exports = function QuotationPainter(chartCanvasViewModel) {
  this.chartCanvasViewModel = chartCanvasViewModel

  this.backgroundContext = wx.createCanvasContext(ChartCanvasIds.background)
  this.meshContext = wx.createCanvasContext(ChartCanvasIds.mesh)
  this.priceContext = wx.createCanvasContext(ChartCanvasIds.price)
  this.percentContext = wx.createCanvasContext(ChartCanvasIds.percent)
  this.timeContext = wx.createCanvasContext(ChartCanvasIds.time)
  this.minuteLineContext = wx.createCanvasContext(ChartCanvasIds.minuteLine)
  this.avgLineContext = wx.createCanvasContext(ChartCanvasIds.avgLine)

  this.init = function() {
    this._drawBackgroundContext()
    this._drawMeshContext()
    this.shouldDrawTime = true
  }

  this.updateDatas = function(quotationViewModel) {
    var marginValueChanged = this._isMarginValueChanged(this.quotationViewModel, quotationViewModel)
    this.quotationViewModel = quotationViewModel

    if (this.shouldDrawTime) this._drawTimeContext()
    if (marginValueChanged) this._drawPriceAndPercentContext()
    this._drawChartLineContext()
  }

  this._isMarginValueChanged = function(currentQuotationViewModel, newQuotationViewModel) {
    if (!currentQuotationViewModel) return true
    var maxMarginValueChanged = currentQuotationViewModel.quotationModel.maxClose != newQuotationViewModel.quotationModel.maxClose
    var minMarginValueChanged = currentQuotationViewModel.quotationModel.minClose != newQuotationViewModel.quotationModel.minClose
    return maxMarginValueChanged || minMarginValueChanged
  }

  this._drawBackgroundContext = function() {
    var bachgroundCtx = this.backgroundContext
    var backgroundRect = this.chartCanvasViewModel.backgroundRect
    bachgroundCtx.setFillStyle(ChartStyles.background.color)
    bachgroundCtx.fillRect(backgroundRect.beginX, backgroundRect.beginY, backgroundRect.endX, backgroundRect.endY)
    bachgroundCtx.draw()
  }

  this._drawMeshContext = function() {
    var meshCtx = this.meshContext
    var meshRect = this.chartCanvasViewModel.meshRect
    meshCtx.setStrokeStyle(ChartStyles.mesh.color)
    meshCtx.setLineWidth(ChartStyles.mesh.lineWidth)
    for (var i = 0; i <= meshRect.row; i++) {
      var y = meshRect.beginY + i * meshRect.spaceY
      meshCtx.beginPath()
      meshCtx.moveTo(meshRect.beginX, y)
      meshCtx.lineTo(meshRect.endX, y)
      meshCtx.stroke()
    }
    for (var i = 0; i <= meshRect.column; i++) {
      var x = meshRect.beginX + i * meshRect.spaceX
      meshCtx.beginPath()
      meshCtx.moveTo(x, meshRect.beginY)
      meshCtx.lineTo(x, meshRect.endY)
      meshCtx.stroke()
    }

    meshCtx.draw()
  }

  this._drawPriceAndPercentContext = function() {
    var priceRect = this.chartCanvasViewModel.priceRect
    var percentRect = this.chartCanvasViewModel.percentRect

    var priceCtx = this.priceContext
    var percentCtx = this.percentContext

    priceCtx.setFontSize(ChartStyles.priceText.font)
    percentCtx.setFontSize(ChartStyles.priceText.font)

    priceCtx.setTextAlign(priceRect.textAlign)
    percentCtx.setTextAlign(percentRect.textAlign)

    var row = this.chartCanvasViewModel.meshRect.row
    for (var i = 0; i <= row; i++) {
      var textColor = ChartStyles.priceText.color.normal
      if (i < row / 2) textColor = ChartStyles.priceText.color.up
      if (i > row / 2) textColor = ChartStyles.priceText.color.down
      priceCtx.setFillStyle(textColor)
      percentCtx.setFillStyle(textColor)

      var offsetVertical = ChartStyles.priceText.font / 2
      if (i == 0) offsetVertical *= 2
      if (i == row) offsetVertical *= 0

      var y = priceRect.beginY + i * priceRect.spaceY
      var price = this.quotationViewModel.getPrice(y)
      priceCtx.fillText(price, priceRect.beginX, y + offsetVertical)

      var y = percentRect.beginY + i * percentRect.spaceY
      var percent = this.quotationViewModel.getPercent(y)
      percentCtx.fillText(percent, percentRect.beginX, y + offsetVertical)
    }

    priceCtx.draw()
    percentCtx.draw()
  }

  this._drawTimeContext = function() {
    var timeCtx = this.timeContext
    var timeRect = this.chartCanvasViewModel.timeRect

    var timeStrings = this.quotationViewModel.timeStrings
    var timeSections = this.quotationViewModel.timeSections

    timeCtx.setFillStyle(ChartStyles.timeText.color)
    timeCtx.setFontSize(ChartStyles.timeText.font)

    for (var i = 0; i < timeStrings.length; i++) {
      var textAlign = ChartStyles.textAlign.center
      if (i == 0) textAlign = ChartStyles.textAlign.left
      if (i == timeStrings.length - 1) textAlign = ChartStyles.textAlign.right
      timeCtx.setTextAlign(textAlign)

      var x = timeSections[i]
      timeCtx.fillText(timeStrings[i], x, timeRect.beginY)
    }

    timeCtx.draw()
  }

  this._drawChartLineContext = function() {
    var minuteLineCtx = this.minuteLineContext
    var avgLineCtx = this.avgLineContext

    var meshRect = this.chartCanvasViewModel.meshRect
    var kLineItems = this.quotationViewModel.quotationModel.kLineItems

    minuteLineCtx.setStrokeStyle(ChartStyles.minuteLine.color)
    minuteLineCtx.setFillStyle(ChartStyles.minuteLine.fillcolor)
    minuteLineCtx.setLineWidth(ChartStyles.minuteLine.width)
    avgLineCtx.setStrokeStyle(ChartStyles.avgLine.color)
    avgLineCtx.setLineWidth(ChartStyles.avgLine.width)

    minuteLineCtx.beginPath()
    avgLineCtx.beginPath()

    var x, y, i = 0
    x = this.quotationViewModel.getX(i)
    y = this.quotationViewModel.getY(kLineItems[i].close)
    minuteLineCtx.moveTo(x, y)
    y = this.quotationViewModel.getY(kLineItems[i].avg)
    avgLineCtx.moveTo(x, y)

    for (var i = 0; i < kLineItems.length; i++) {
      x = this.quotationViewModel.getX(i)
      y = this.quotationViewModel.getY(kLineItems[i].close)
      minuteLineCtx.lineTo(x, y)
      y = this.quotationViewModel.getY(kLineItems[i].avg)
      avgLineCtx.lineTo(x, y)
    }
    minuteLineCtx.setGlobalAlpha(1)
    minuteLineCtx.stroke()

    minuteLineCtx.lineTo(x, meshRect.endY)
    minuteLineCtx.lineTo(meshRect.beginX, meshRect.endY)
    minuteLineCtx.setGlobalAlpha(0.2)
    minuteLineCtx.fill()

    minuteLineCtx.draw()

    avgLineCtx.stroke()

    avgLineCtx.draw()
  }
}