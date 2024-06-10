import React from "react";
import ImageTag from "../_atomic-design/atoms/ImageTag";
import GeneralText from "../_atomic-design/atoms/Text/GeneralText";
import Biva from '../assets/images/Icons/biva4.png'
import User from '../assets/images/Icons/user1.png'

export default function MessageBox2 ({ author, text, timeStamp }){

    return <div className={`h-max w-full sm:w-max sm:max-w-[60%] flex flex-col my-2 ${author === 'user' ? ' ml-auto ' : ' mr-auto '}` }>
        <div className={`flex flex-col sm:flex-row  ${author === 'user' ? ' ml-auto ' : ' mr-auto '}`}>
            {author !== 'user' && <ImageTag src={ Biva } className={`mx-2 w-[40px] h-[40px] rounded-full bg-white hidden sm:flex`}/>}
            <ImageTag src={ author === 'user' ? User : Biva } className={`mx-2 my-2 w-[20px] h-[20px] rounded-full bg-white sm:hidden ${author === 'user' ? ' ml-auto ' : ' mr-auto '}`}/>
            { author === 'alert' && <GeneralText text={text} className={'text-red-700 text-xs my-auto'}/> }
            { author === 'biva' && <GeneralText text={text} className={'bg-[#E7E7E7] text-black p-2 px-4 rounded-2xl'}/>}
            { author === 'user' && <GeneralText text={text} className={'bg-[#6042D1] text-white p-2 px-4 rounded-2xl'}/>}
            {author === 'user' && <ImageTag src={ User } className={'mx-2 w-[40px] h-[40px] rounded-full bg-white hidden sm:flex'}/>}
        </div>
        { timeStamp && <p className={` text-[#707070] font-light text-sm my-1 mx-4 ${author === 'user' ? ' ml-auto ' : ' mr-auto '}`}>{new Date(timeStamp).toLocaleTimeString()}</p>}
    </div>
}