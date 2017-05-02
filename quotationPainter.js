var chartStyle = require('./chartStyle')

module.exports = function QuotationPainter(chartCanvasViewModel) {
  this.style = chartStyle
  this.chartCanvasViewModel = chartCanvasViewModel

  this.backgroundContext = wx.createCanvasContext(chartCanvasViewModel.chartCanvasIds.background)
  this.meshContext = wx.createCanvasContext(chartCanvasViewModel.chartCanvasIds.mesh)
  this.priceContext = wx.createCanvasContext(chartCanvasViewModel.chartCanvasIds.price)
  this.percentContext = wx.createCanvasContext(chartCanvasViewModel.chartCanvasIds.percent)
  this.timeContext = wx.createCanvasContext(chartCanvasViewModel.chartCanvasIds.time)
  this.minuteLineContext = wx.createCanvasContext(chartCanvasViewModel.chartCanvasIds.minuteLine)
  this.avgLineContext = wx.createCanvasContext(chartCanvasViewModel.chartCanvasIds.avgLine)

  this._updateBackgroundContext(chartCanvasViewModel.backgroundRect)
  this._updateMeshContext(chartCanvasViewModel.meshRect)
  this._updateTimeContext(chartCanvasViewModel.timeRect)

  this.updateContexts = function(quotationViewModel) {
    this.quotationViewModel = quotationViewModel

    //如果 最大值最小值变化 更新 价格和百分比
    this._updatePriceContext(chartCanvasViewModel.priceRect)
    this._updatePercentContext(chartCanvasViewModel.percentRect)

    //如果 数据有新数据 更新 走势图
    this._updateMinuteLineContext(chartCanvasViewModel.meshRect)
    this._updateAvgLineContext(chartCanvasViewModel.meshRect)
  }

  this.draw = function() {
    this.backgroundContext.draw()
    this.meshContext.draw()
    this.priceContext.draw()
    this.percentContext.draw()
    this.timeContext.draw()
  }

  this._updateBackgroundContext = function(backgroundRect) {
    let ctx = this.backgroundContext
    ctx.setFillStyle(this.style.backgroundColor)
    ctx.fillRect(backgroundRect.beginX, backgroundRect.beginY, backgroundRect.endX, backgroundRect.endY)
  }

  this._updateMeshContext = function(meshRect) {
    let ctx = this.meshContext
    ctx.setFillStyle(this.style.meshColor)
    ctx.setLineWidth(0.5)

    for (var i = 0; i <= this.chartCanvasViewModel.meshRect.row; i++) {
      var y = meshRect.beginY + i * meshRect.spaceY
      ctx.beginPath()
      ctx.moveTo(meshRect.beginX, y)
      ctx.lineTo(meshRect.endX, y)
      ctx.stroke()
    }
    for (var i = 0; i <= this.chartCanvasViewModel.meshRect.column; i++) {
      var x = meshRect.beginX + i * meshRect.spaceX
      ctx.beginPath()
      ctx.moveTo(x, meshRect.beginY)
      ctx.lineTo(x, meshRect.endY)
      ctx.stroke()
    }
  }

  this._updatePriceContext = function(priceRect) {
    var ctx = this.priceContext
    ctx.setFillStyle(this.style.priceTextColor)
    ctx.setFontSize(this.style.priceTextFont)
    ctx.setTextAlign(this.priceRect.textAlign)

    for (var i = 0; i <= this.chartCanvasViewModel.meshRect.row; i++) {
      var y = priceRect.beginY + i * priceRect.spaceY
      var price = this.quotationViewModel.getPrice(y)
      ctx.fillText(price, priceRect.beginX, y)
    }
  }

  this._updatePercentContext = function(percentRect) {
    var ctx = this.percentContext
    ctx.setFontSize(this.style.percentTextFont)
    ctx.setTextAlign(this.percentRect.textAlign)

    for (var i = 0; i <= this.chartCanvasViewModel.meshRect.row; i++) {
      var percentTextColor = this.style.percentTextColor.normal
      if (i < this.chartCanvasViewModel.meshRect.row / 2) percentTextColor = this.style.percentTextColor.normal
      if (i > this.chartCanvasViewModel.meshRect.row / 2) percentTextColor = this.style.percentTextColor.normal
      ctx.setFillStyle(this.style.percentTextColor)

      var y = percentRect.beginY + i * percentRect.spaceY
      var percent = this.quotationViewModel.getPercent(y)
      ctx.fillText(percent, percentRect.beginX, y)
    }
  }

  this._updateTimeContext = function(timeRect) {
    var ctx = this.timeContext
    ctx.setFillStyle(this.style.timeTextColor)
    ctx.setFontSize(this.style.timeTextFont)

    for (var i = 0; i <= this.chartCanvasViewModel.meshRect.column; i++) {
      var textAlign = this.style.textAlign.center
      if (i == 0) textAlign = this.style.textAlign.left
      if (i == this.chartCanvasViewModel.meshRect.column) textAlign = this.style.textAlign.right
      ctx.setTextAlign(textAlign)

      var x = timeRect.beginX + i * timeRect.spaceX
      var time = ''
      ctx.fillText(time, x, this.timeRect.beginY)
    }
  }

  this._updateMinuteLineContext = function(meshRect) {
    var ctx = this.minuteLineContext
    ctx.setFillStyle(this.style.minuteLineColor)
    ctx.setLineWidth(0.5)

    ctx.beginPath()
    ctx.moveTo(meshRect.beginX, meshRect.exdY)

    var x, y
    for (var i = 0; i <= this.quotationModel.kLineItems.length; i++) {
      x = meshRect.beginX + i * meshRect.spaceX
      y = this.getY(this.quotationModel.kLineItems[i])
      ctx.lineTo(x, y)
    }
    ctx.lineTo(x, meshRect.exdY)
    ctx.lineTo(meshRect.beginX, meshRect.exdY)

    ctx.stroke()
    ctx.fill()
  }

  this._updateAvgLineContext = function(meshRect) {
    var ctx = this.avgLineContext
    ctx.setLineWidth(0.5)

    ctx.beginPath()
    ctx.moveTo(meshRect.beginX, meshRect.exdY)

    var x, y
    for (var i = 0; i <= this.quotationModel.kLineItems.length; i++) {
      x = meshRect.beginX + i * meshRect.spaceX
      y = this.getY(this.quotationModel.kLineItems[i])
      ctx.lineTo(x, y)
    }

    ctx.stroke()

  }
}