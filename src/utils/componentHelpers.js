import { useEffect } from 'react'

/**
* This function adds a listener to capture the click outside of a component
* @param {React.ref} ref - The reference to the component
* @param {Function} onClick - The function to be called when the click is outside of the ref component
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/

export const useOutsideAlerter = (ref, onClick) => {
  useEffect(() => {
    /**
       * Alert if clicked on outside of element
       */
    function handleClickOutside (event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
