export function calculateTimeDifference (timestamp1, timestamp2) {
  const time1 = new Date(timestamp1)
  const time2 = new Date(timestamp2)

  // Calculate the difference in milliseconds
  const difference = Math.abs(time2 - time1)

  // Convert milliseconds to seconds
  const seconds = Math.floor(difference / 1000)

  // Calculate hours
  const hours = Math.floor(seconds / 3600)

  // Calculate minutes
  const minutes = Math.floor((seconds % 3600) / 60)

  // Calculate remaining seconds
  const remainingSeconds = seconds % 60

  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds
  }
}
