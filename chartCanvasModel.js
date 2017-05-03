var CanvasFrame = require('./chartCanvasFrames')

module.exports = function ChartCanvasModel(canvasFrame = CanvasFrame) {
  this.size = canvasFrame.size
  this.priceFrame = canvasFrame.priceFrame
  this.percentFrame = canvasFrame.percentFrame
  this.timeFrame = canvasFrame.timeFrame
  this.chartFrame = canvasFrame.chartFrame
  this.meshFrame = {
    row: canvasFrame.meshFrame.row,
    column: canvasFrame.meshFrame.column,
    origin: {
      x: canvasFrame.meshFrame.padding.left,
      y: canvasFrame.meshFrame.padding.top,
    },
    end: {
      x: canvasFrame.size.width - canvasFrame.meshFrame.padding.right,
      y: canvasFrame.size.height - canvasFrame.meshFrame.padding.bottom,
    },
    size: {
      width: canvasFrame.size.width - canvasFrame.meshFrame.padding.left - canvasFrame.meshFrame.padding.right,
      height: canvasFrame.size.height - canvasFrame.meshFrame.padding.top - canvasFrame.meshFrame.padding.bottom,
    },
  }
}