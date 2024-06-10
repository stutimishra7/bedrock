import React, { useEffect, useRef, useState } from "react";
import Textinput from "../_atomic-design/molecules/Input/TextInputGray";
import GeneralButton from "../_atomic-design/atoms/Button/GeneralButton";
import ImageTag from "../_atomic-design/atoms/ImageTag";
import Send from '../assets/images/Icons/send.svg'
import { makeServerGETRequest, makeServerRequest } from "../utils/helpers";
import ReactLoading from 'react-loading';
import biva from '../assets/images/Icons/biva4.png'
// import CrossGreen from '../assets/images/Icons/CrossBlue.svg'
import { useSearchParams } from "react-router-dom";
import MessageBox2 from "../components/MessageBox2";

export default function ChatBotV2 () {
    const [searchParams] = useSearchParams()
    const chatContainerRef = useRef(null)
    const [inputText, setInputText] = useState('')
    const [chatBotName, setChatBotName] = useState('')
    const [chatBotUrl, setChatBotUrl] = useState('')
    const [chatHistory, setChatHistory] = useState([]) // author : [biva, alert, user] { author: 'alert', text: 'Some error occured' }
    const [serverResponse, setServerResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const chatID = searchParams.get('chatID')
    const courseId = searchParams.get('courseId') || Date.now()
    const email = searchParams.get('email') || 'prasenjit@dkraftlearning.com'
    const studentEmail = searchParams.get('studentEmail') || 'dummyStudent@gmail.com'
    async function sendHandler(){
        setChatHistory([...chatHistory, {author: 'user', text: inputText, timeStamp: Date.now()}])
        setLoading(true)
        setInputText('')
        const res = await makeServerRequest('/chatBot/getAnswer', 'POST', { message: inputText, url: chatBotUrl, chatBotName: chatBotName, studentEmail: studentEmail, email: email, courseId: courseId })
        setLoading(false)
        if (res !== undefined) {
            const r = res.data
            // if (r.type === 'suggestions') {
            //   const msg = { name: 'suggestions', message: r.answer }
            //   messages.push(msg)
            // } else {
            //   const msg2 = { name: 'Biva', message: r.answer }
            //   messages.push(msg2)
            // }
            setServerResponse({author: 'biva', text: r.answer, timeStamp: r.timeStamp})
            // setChatHistory([...chatHistory, {author: 'biva', text: r.answer}])
          } else {
            // const msg = { name: 'notification', message: 'unknown error occured' }
            // messages.push(msg)
            // setChatHistory([...chatHistory, { author: 'alert', text: 'unknown error occured'}])
            setServerResponse({author: 'alert', text: 'unknown error occured'})
          }
    }

    const handleEnterKey = (event) => {
        if (event.key === 'Enter' && loading === false) {
          // Trigger the button click event
          sendHandler();
        }
      }

    async function fetchBiva(){
        // console.log('chatID:', chatID)
        const res = await makeServerGETRequest('/chatBot/getBivaUrl', { chatID, courseId, email })
        if(res && res.status === 200){
            setChatBotName(res.data.chatBotName)
            setChatBotUrl(res.data.userChatAPI)
        } else {
            console.log('biva not available')
        }
    }

    useEffect(()=> {
        fetchBiva()
    },[])

    // useEffect(()=>{
    //     makeServerGETRequest('/chatbot/getChatHistory')
    //     .then((req)=>{
    //         if(req && req.status === 200 && req.data){
    //             setChatHistory(req.data.chatHistory)
    //         }
    //     })
    // }, [chatBotUrl])

    useEffect(()=>{
        if(serverResponse === null){
            return
        }
        setChatHistory([...chatHistory, serverResponse])

        return setServerResponse(null)
    }, [serverResponse])

    useEffect(() => {
        // Scroll to the bottom of the chat container
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [chatHistory])

    return <div className="border w-full h-full flex flex-col mx-auto mt-auto mb-10 p-6 relative shadow-2xl rounded-lg bg-white">
        <div className="mb-auto  h-max w-full flex ">
            <ImageTag src={biva} className='rounded-full w-14  h-14'/>
            <div className="my-auto mx-2 flex flex-col">
                <p className="my-auto">Hi there. I am Biva. How can I help you?</p>
                <div className="font-bold text-sm">{chatBotName ? <p className="text-green-500">Online</p> : <p className="text-red-500">Offline</p>}</div>
            </div>
            
            {/* <button className="ml-auto my-auto"><ImageTag src={CrossGreen} /></button> */}
            {/* <p className="my-auto mx-2 text-xs font-bold">{chatBotName}</p> */}
        </div>
        <hr className="my-2"></hr>
        <div className=" flex flex-col overflow-y-scroll no-scrollbar h-full w-full" ref={chatContainerRef}>
            {chatHistory.map((chat, index) => {
                return <div key={index}><MessageBox2 text={chat.text} author={chat.author} timeStamp={chat.timeStamp} type={chat.type}/></div>
            })}
        </div>
        <div className="mt-auto h-max w-full flex ">
            <div className="flex flex-row bg-white h-max w-full p-2 rounded-lg">
                <Textinput value={inputText} onChange={(e) => setInputText(e.target.value)} className={'w-full h-max my-auto mr-2'} placeholder={'Type your message...'} 
                onKeyDown = {handleEnterKey} />
                { loading
                    ?   <ReactLoading color="#3C38CD" type="bars" height={40} width={40} className="my-auto"/>
                    :   <GeneralButton onClick={sendHandler} content={<ImageTag src={Send} />} disabled={inputText.length === 0} className={'w-max h-max p-3 rounded-xl bg-gradient-to-r from-[#3C38CD] to-[#8D67D7] my-auto disabled:cursor-not-allowed'}/>  
                }
            </div>
        </div>
    </div>
}