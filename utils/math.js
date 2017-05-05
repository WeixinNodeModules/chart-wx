function percent(numerator, denominator) {
  return (Math.round(numerator / denominator * 10000) / 100.00).toFixed(2) + "%" // 小数点后两位百分比
}

function between(min, max, value) {
  return Math.min(Math.max(value, min), max)
}

module.exports = {
  percent: percent,
  between: between
}