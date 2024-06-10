/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { makeServerRequest } from '../../utils/helpers'
import HeadingSm from '../../_atomic-design/atoms/Text/HeadingSm'

import GeneralText from '../../_atomic-design/atoms/Text/GeneralText'
import ReactLoading from 'react-loading'
import GeneralButton from '../../_atomic-design/atoms/Button/GeneralButton'

export default function Dashboard () {
  const [bots, setBots] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getdata = async () => {
      const databot = await makeServerRequest('/upload/getAllBot', 'POST', {})
      if (databot.status === 200) {
        setBots(databot.data.allbotDetails.reverse()) // reverse method to show latest quiz on top
        console.log(databot.data, 'databot.data.allbotDetails')
      }
    }
    setLoading(true)
    getdata().catch(() => { })
    setLoading(false)
    document.title = 'Bot dashboard'
  }, [])

  const handleBotSelect = (chatBotName,userChatAPI) => {
    console.log('handleClick')
    const chatbotname = document.getElementById('chatbot_name')
    chatbotname.innerText = chatBotName
    const chatbotURL = document.getElementById('chatbot_url')
    chatbotURL.innerText = userChatAPI
    const headingname = document.getElementById('supportName')
    headingname.innerText = 'Chat Support (' + chatbotname.innerText + ')'
    
  }
  return (
        <div className="bg-[#EFEFEF] min-h-screen h-max">
            <div className="w-11/12 md:w-4/5 max-w-7xl mx-auto pt-20">
                <div className="flex justify-start items-center">
                    <HeadingSm text={'Your Bots'} />
                </div>
                {loading
                  ? (<ReactLoading type="spin" className='m-auto pt-8' color="#916AF8" height={40} width={35} />)
                  : (<div className=" mt-8">
                      {bots.map((bot, index) => {
                        return (
                          <div key={index} className='flex flex-row border bg-white shadow-lg rounded-lg p-6'>
                          <div className='flex bg-[#F3F0FA] text-[#3C38CD] h-10 w-10 justify-center content-center my-auto mr-4 rounded-md'><p className='my-auto'>{index+1}</p></div>
                          <div className='flex flex-col'>
                            <div className='flex gap-2'><p className='font-bold'>Bot Name: </p><p className='text-[#3C38CD]'>{bot.chatBotName}</p></div>
                            <div className='flex gap-2'><p className='font-bold'>Bot Url: </p> <p className='text-[#939393]'>{bot.userChatAPI}</p></div>
                          </div>
                          <GeneralButton
            // eslint-disable-next-line quotes
                            id='bot_individual'
                            className={`h-11 rounded-md w-max px-4 ml-auto my-auto text-white flex justify-center items-center ${false ? 'bg-app-grey cursor-not-allowed' : 'bg-app-primary cursor-pointer'}`}
                            content={'Select'}
                            onClick={() => handleBotSelect(bot.chatBotName,bot.userChatAPI)} 
                            />
                <br/>
                <br/>
                </div>
                )
          })}
          {(bots.length < 1)
            ? (<div className="w-full  max-w-7xl mb-4 p-5 shadow-lg flex flex-col lg:flex-row justify-center items-center rounded-[10px] bg-red-200 overflow-auto text-xs sm:text-sm md:text-base"
            >
              <div className='flex flex-col'>
                <div className='flex flex-col lg:flex-row'>
                  <div className=" flex">
                    <GeneralText text="You don't have any bots to see" className='text-base font-bold' />
                  </div>
                  </div>
                  </div>
                  </div>)
            : null}

      </div>)}

            </div>
        </div>
  )
}
