module.exports = function ChartCanvasModel(data = {
  size = {
    height = 0,
    width = 0
  },
  meshFrame = {
    padding = {
      top = 0,
      left = 0,
      bottom = 0,
      right = 0
    },
    row = 1,
    column = 1
  },
  priceFrame = {
    paddingLeft = 0,
    textAlign = 'left'
  },
  percentFrame = {
    paddingLeft = 0,
    textAlign = 'left'
  },
  timeFrame = {
    paddingTop = 0
  },
  chartFrame = {
    chartPaddingVertical = 0
  }
}) {
  this.meshFrame = {
    origin: {
      x: data.meshFrame.padding.left,
      y: data.meshFrame.padding.top,
    },
    end: {
      x: data.meshFrame.padding.right,
      y: data.meshFrame.padding.bottom,
    },
    size: {
      width: data.size.width - data.meshFrame.padding.left - data.meshFrame.padding.right,
      height: data.size.width - data.meshFrame.padding.top - data.meshFrame.padding.bottom,
    }
  }
  this.priceFrame = {
    paddingLeft: data.priceFrame.paddingLeft,
    textAlign: data.priceFrame.textAlign,
  }
  this.percentFrame = {
    paddingLeft: data.percentFrame.paddingLeft,
    textAlign: data.percentFrame.textAlign,
  }
  this.timeFrame = {
    paddingTop: data.percentFrame.paddingTop
  }
  this.chartFrame = {
    chartPaddingVertical: data.chartFrame.chartPaddingVertical
  }
}