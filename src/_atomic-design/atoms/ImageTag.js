import React from 'react'
function ImageTag (props) {
  return (
        <img {...props} alt={ props.alt || 'image' }/>
  )
}
export default ImageTag
