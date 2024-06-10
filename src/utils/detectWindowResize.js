/* Limitations:
    1.Need to implement logic to detect multiple displays.
    2. The function is only checking height. If we open chrome dev
    tools, it opens on the right, only changing width and not height,
    hence this function unable to detect it's not full screen.
*/

export function detectWindowResize ({ isFullScreen, setIsFullScreen }) {
  window.addEventListener('resize', toggleFullScreen.bind(this))

  let timer = 0
  function checkScreenSize () {
    if (screen.height - window.innerHeight < 100) { // less than 100 used to account for some os reserved pixels
      setIsFullScreen(true)
    } else {
      setIsFullScreen(false)
    }
  }

  function toggleFullScreen () {
    clearTimeout(timer)
    timer = setTimeout(checkScreenSize, 300)
    return () => clearTimeout(timer)
  }
  return () => removeEventListener('resize')
}
