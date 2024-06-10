
export function enterFullScreen () {
  const element = document.documentElement // Get the document's root element
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) { // Internet Explorer and Edge
    element.msRequestFullscreen()
  }
}

export function exitFullScreenHandler () {
  if (!document.fullscreenElement && !document.webkitFullscreenElement &&
      !document.mozFullScreenElement && !document.msFullscreenElement) {
    // User has exited full-screen mode
    alert('You tried to exit full screen mode. If it happens again, your test will be auto submitted.')
    enterFullScreen()
    // Add your code here to handle the event
  }
}
// Detect full-screen change event
