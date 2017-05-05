var CanvasFrames = require('../config/chartCanvasFrames')

module.exports = function ChartCanvasModel(canvasFrames = CanvasFrames) {
  var size = canvasFrames.size || CanvasFrames.size
  var priceFrame = canvasFrames.priceFrame || CanvasFrames.priceFrame
  var percentFrame = canvasFrames.percentFrame || CanvasFrames.percentFrame
  var timeFrame = canvasFrames.timeFrame || CanvasFrames.timeFrame
  var chartFrame = canvasFrames.chartFrame || CanvasFrames.chartFrame
  var meshFrame = canvasFrames.meshFrame || CanvasFrames.meshFrame

  this.size = size
  this.priceFrame = priceFrame
  this.percentFrame = percentFrame
  this.timeFrame = timeFrame
  this.chartFrame = chartFrame
  this.meshFrame = {
    row: meshFrame.row,
    column: meshFrame.column,
    origin: {
      x: meshFrame.padding.left,
      y: meshFrame.padding.top,
    },
    end: {
      x: size.width - meshFrame.padding.right,
      y: size.height - meshFrame.padding.bottom,
    },
    size: {
      width: canvasFrames.size.width - meshFrame.padding.left - meshFrame.padding.right,
      height: canvasFrames.size.height - meshFrame.padding.top - meshFrame.padding.bottom,
    },
  }
}