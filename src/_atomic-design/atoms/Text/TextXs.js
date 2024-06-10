import React from 'react'

export default function TextXs ({ text, className, onClick }) {
  return (
        <p className={`text-xs ${className}`} onClick={onClick} > {text} </p>
  )
}
