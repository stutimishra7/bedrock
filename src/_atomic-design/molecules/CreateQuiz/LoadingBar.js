import React from 'react'
import TextXs from '../../atoms/Text/TextXs'

export default function LoadingBar ({ progress }) {
  return (
    <div className='w-full flex flex-row items-center justify-end'>
      <div className="w-16 md:w-24 h-1 bg-white rounded-full mx-2">
        <div className='h-full bg-app-blue rounded-full bg-app-primary' style={{ width: progress + '%' }}></div>
      </div>
      <TextXs text={progress + '%'} className="" />
    </div>
  )
}
