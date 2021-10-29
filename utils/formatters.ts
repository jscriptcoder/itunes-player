export const priceFormat = (value: number, decimals: number = 2) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
  })

  return formatter.format(value)
}