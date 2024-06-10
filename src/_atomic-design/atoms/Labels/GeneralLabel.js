import React from 'react'

export default function GeneralLabel ({ className, text }) {
  return <div className={` ${className} w-max m-1 text-center items-center border rounded-xl text-[#0071F4] bg-[#EDF0FF] px-4 py-1`}>
        {text}</div>
}
