import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'

export default function DateLabel ({ className, text }) {
  return <div className={` ${className} w-max m-1 text-center flex items-center border rounded-xl text-[#0071F4] bg-[#EDF0FF] px-4 py-1`}>
        <AiOutlineCalendar className="mr-2" />{text}</div>
}
