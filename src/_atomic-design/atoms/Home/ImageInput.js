import React from 'react'

export default function ImageInput ({ onChange, className, acceptFileTypes, multiple, ref }) {
  return (
        <input
            type="file"
            onChange={onChange}
            name="uploaded"
            id="dfdsfsdfs"
            accept={acceptFileTypes}
            // eslint-disable-next-line quotes
            className={` ${className} absolute opacity-0 border-8 z-10 cursor-pointer`}
            multiple={multiple}
            ref={ref}
        />
  )
}
