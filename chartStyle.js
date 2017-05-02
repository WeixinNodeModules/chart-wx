module.exports = {
  canvasFrame: {
    size: {
      height: 245,
      width: 375,
    },
    meshFrame: {
      padding: {
        top: 10,
        left: 50,
        bottom: 20,
        right: 0,
      },
      row: 4,
      column: 4,
    },
    priceFrame: {
      paddingLeft: 25,
      textAlign: 'center',
    },
    percentFrame: {
      paddingLeft: 375,
      textAlign: 'right',
    },
    timeFrame: {
      paddingTop: 245,
    },
    chartFrame: {
      chartPaddingVertical: 12,
    }
  },
  backgroundColor: 'white',
  meshLineWidth: 0.5,
  meshColor: 'gray',
  priceTextFont: '12',
  priceTextColor: {
    normal: 'black',
    up: 'red',
    down: 'green',
  },
  percentTextFont: '12',
  percentTextColor: {
    normal: 'black',
    up: 'red',
    down: 'green',
  },
  timeTextFont: '12',
  timeTextColor: 'black',
  textAlign: {
    right: 'right',
    center: 'center',
    left: 'left',
  },
  minuteLineWidth: 0.5,
  minuteLineColor: 'blue',
  minuteFillColor: 'yellow',
  avgLineWidth: 0.5,
  avgLineColor: 'orange',
}