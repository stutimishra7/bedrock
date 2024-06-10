import React from 'react'
function Image ({ mainRef, src, className }) {
  return (
    <div className="h-full w-full" ref={mainRef}>
      <div
        className={className}
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </div>
  )
}
export default Image
