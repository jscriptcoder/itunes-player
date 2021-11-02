export const priceFormat = (value: number, decimals: number = 2): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
  })

  return formatter.format(value)
}

export const secondsFormat = (seconds: number): string => {
  const mins: number = Math.floor(seconds / 60)
  const strMins = (mins < 10 ? '0' : '') + mins
  const secs: number = seconds % 60
  const strSecs = (secs < 10 ? '0' : '') + secs
  return `${strMins}:${strSecs}`
}