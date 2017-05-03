module.exports = function ChartCanvas(chartCanvasModel) {
  this.backgroundRect = {
    beginX: 0,
    beginY: 0,
    endX: chartCanvasModel.size.width,
    endY: chartCanvasModel.size.height,
  }

  this.meshRect = {
    row: chartCanvasModel.meshFrame.row,
    column: chartCanvasModel.meshFrame.column,
    width: chartCanvasModel.meshFrame.size.width,
    height: chartCanvasModel.meshFrame.size.height,
    beginX: chartCanvasModel.meshFrame.origin.x,
    beginY: chartCanvasModel.meshFrame.origin.y,
    endX: chartCanvasModel.meshFrame.end.x,
    endY: chartCanvasModel.meshFrame.end.y,
    spaceX: chartCanvasModel.meshFrame.size.width / chartCanvasModel.meshFrame.column,
    spaceY: chartCanvasModel.meshFrame.size.height / chartCanvasModel.meshFrame.row,
  }

  this.priceRect = {
    textAlign: chartCanvasModel.priceFrame.textAlign,
    beginX: chartCanvasModel.priceFrame.paddingLeft,
    beginY: chartCanvasModel.meshFrame.origin.y,
    spaceY: chartCanvasModel.meshFrame.size.height / chartCanvasModel.meshFrame.row,
  }

  this.percentRect = {
    textAlign: chartCanvasModel.percentFrame.textAlign,
    beginX: chartCanvasModel.percentFrame.paddingLeft,
    beginY: chartCanvasModel.meshFrame.origin.y,
    spaceY: chartCanvasModel.meshFrame.size.height / chartCanvasModel.meshFrame.row,
  }

  this.timeRect = {
    beginX: chartCanvasModel.meshFrame.origin.x,
    beginY: chartCanvasModel.timeFrame.paddingTop,
    spaceX: chartCanvasModel.meshFrame.size.width / chartCanvasModel.meshFrame.column,
  }
}