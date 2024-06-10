import React from 'react'

export default function HeadingSm ({ text, className }) {
  return (
        <h1 className={`text-black font-semibold text-2xl ${className}`} >{text}</h1>
  )
}
