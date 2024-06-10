import React from 'react'

export default function HiddenInput ({ onChange, className, acceptFileTypes, multiple, ref }) {
  return (
        <input
            type="file"
            onChange={onChange}
            name="uploaded"
            id="dfdsfsdfs"
            accept={acceptFileTypes}
            // eslint-disable-next-line quotes
            className={` ${className} absolute w-full h-full opacity-0 z-10 cursor-pointer`}
            multiple={multiple}
            ref={ref}
        />
  )
}
