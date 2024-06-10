import React from 'react'
import TextBody from '../../atoms/Text/TextBody'
function TotalScore () {
  return (
        <div className="flex justify-between">
            <TextBody text="Total Score" className=""/>
            <div className="flex items-center justify-center w-10 h-8 border-app-w-1.5 border-black rounded-md">1</div>
        </div>
  )
}
export default TotalScore
