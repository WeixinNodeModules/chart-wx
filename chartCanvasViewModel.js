var CanvasIds = require('./chartCanvasConfig').canvasIds

module.exports = function ChartCanvas(chartCanvasModel) {
  this.chartCanvasIds = CanvasIds
  this.backgroundRect = {
    beginX: 0,
    beginY: 0,
    endX: model.size.width,
    endY: model.size.height,
  }

  this.meshRect = {
    row: model.meshFrame.row,
    column: model.meshFrame.column,
    width: model.meshFrame.width,
    height: model.meshFrame.height,
    beginX: model.meshFrame.origin.x,
    beginY: model.meshFrame.origin.y,
    endX: model.meshFrame.end.x,
    endY: model.meshFrame.end.y,
    spaceX: model.meshFrame.width / model.meshFrame.column,
    spaceY: model.meshFrame.height / model.meshFrame.row,
  }

  this.priceRect = {
    textAlign: model.priceFrame.textAlign,
    beginX: model.priceFrame.paddingLeft,
    beginY: model.meshFrame.beginY,
    spaceY: model.meshFrame.space.y
  }

  this.percentRect = {
    textAlign: model.percentFrame.textAlign,
    beginX: model.percentFrame.paddingLeft,
    beginY: model.meshFrame.beginY,
    spaceY: model.meshFrame.space.y
  }

  this.timeRect = {
    beginX: model.timeFrame.paddingLeft,
    beginY: model.meshFrame.beginY,
    spaceX: model.meshFrame.space.x
  }
}