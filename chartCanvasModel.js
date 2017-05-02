var CanvasFrame = require('./chartStyle').canvasFrame

module.exports = function ChartCanvasModel(canvasFrame = CanvasFrame) {
  this.meshFrame = {
    origin: {
      x: canvasFrame.meshFrame.padding.left,
      y: canvasFrame.meshFrame.padding.top,
    },
    end: {
      x: canvasFrame.meshFrame.padding.right,
      y: canvasFrame.meshFrame.padding.bottom,
    },
    size: {
      width: canvasFrame.size.width - canvasFrame.meshFrame.padding.left - canvasFrame.meshFrame.padding.right,
      height: canvasFrame.size.width - canvasFrame.meshFrame.padding.top - canvasFrame.meshFrame.padding.bottom,
    }
  }
  this.priceFrame = {
    paddingLeft: canvasFrame.priceFrame.paddingLeft,
    textAlign: canvasFrame.priceFrame.textAlign,
  }
  this.percentFrame = {
    paddingLeft: canvasFrame.percentFrame.paddingLeft,
    textAlign: canvasFrame.percentFrame.textAlign,
  }
  this.timeFrame = {
    paddingTop: canvasFrame.percentFrame.paddingTop
  }
  this.chartFrame = {
    chartPaddingVertical: canvasFrame.chartFrame.chartPaddingVertical
  }
}