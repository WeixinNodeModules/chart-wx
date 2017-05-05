# 数据模型

## 行情中每一个报价的数据模型
<pre><code>
KLineItem: {
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  value: 0,
  volume: 0,
  avg: 0,
  updateTime: '',
  status: false,
  preClose: 0,
}
</code></pre>

## 行情图的布局

<pre><code>
ChartCanvasModel: {
  size: {
    height: 245,
    width: 375,
  },
  meshFrame: {
    padding: {
      top: 10,
      left: 50,
      bottom: 20,
      right: 10,
    },
    row: 4,
    column: 4,
  },
  priceFrame: {
    paddingLeft: 25,
    textAlign: 'center',
  },
  percentFrame: {
    paddingLeft: 365,
    textAlign: 'right',
  },
  timeFrame: {
    paddingTop: 245,
  },
  chartFrame: {
    chartPaddingVertical: 12,
  },
}
</code></pre>
  
## 行情图样式

<pre><code>
ChartStyles: {
  textAlign: {
    right: 'right',
    center: 'center',
    left: 'left',
  },
  background: {
    color: 'white',
  },
  mesh: {
    lineWidth: 0.5,
    color: 'gray',
  },
  priceText: {
    font: 12,
    color: {
      normal: 'black',
      up: 'red',
      down: 'green',
    },
  },
  percentText: {
    font: 12,
    color: {
      normal: 'black',
      up: 'red',
      down: 'green',
    },
  },
  timeText: {
    font: 12,
    color: 'black',
  },
  minuteLine: {
    width: 0.5,
    color: 'blue',
    fillcolor: 'yellow',
  },
  avgLine: {
    width: 0.5,
    color: 'orange',
  },
  interactionOut: {
    axis: {
      lineWidth: 0.5,
      color: 'gray',
    },
    timeLabel: {
      font: 12,
      textColor: 'white',
      color: 'orange',
      width: 35,
      height: 20
    },
    priceLabel: {
      font: 12,
      textColor: 'white',
      color: 'orange',
      width: 50,
      height: 20
    },
    percentLabel: {
      font: 12,
      textColor: 'white',
      color: 'orange',
      width: 35,
      height: 20
    },
  }
}
</code></pre>