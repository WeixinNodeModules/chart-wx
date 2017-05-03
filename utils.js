function percent(numerator, denominator) {
  return (Math.round(numerator / denominator * 10000) / 100.00).toFixed(2) + "%" // 小数点后两位百分比
}

module.exports = {
  percent: percent
}