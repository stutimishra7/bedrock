import React from 'react'
import FileSrc from '../../../assets/images/Icons/File.svg'

export default function FileIcon ({ className }) {
  return (
    <img className={` ${className}`} src={FileSrc} alt="" />
  )
}
