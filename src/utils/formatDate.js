export function timeAgo(dateLike) {
  const date = new Date(dateLike)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const ranges = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, secondsInUnit] of ranges) {
    const value = Math.floor(seconds / secondsInUnit)
    if (value >= 1) return `${value} ${unit}${value > 1 ? 's' : ''} ago`
  }
  return 'just now'
}