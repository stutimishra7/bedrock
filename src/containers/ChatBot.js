import React, { useEffect, useRef, useState } from "react";
import Textinput from "../_atomic-design/molecules/Input/TextInputGray";
import GeneralButton from "../_atomic-design/atoms/Button/GeneralButton";
import ImageTag from "../_atomic-design/atoms/ImageTag";
import Send from '../assets/images/Icons/Send.svg'
import MessageBox from "../components/MessageBox";
import { makeServerGETRequest, makeServerRequest } from "../utils/helpers";
import ReactLoading from 'react-loading';
import biva from '../assets/images/Icons/biva1.png'
import { useSearchParams } from "react-router-dom";

export default function ChatBot () {
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
        setChatHistory([...chatHistory, {author: 'user', text: inputText}])
        setLoading(true)
        setInputText('')
        const res = await makeServerRequest('/chatBot/getAnswer', 'POST', { message: inputText, url: chatBotUrl, chatBotName: chatBotName, studentEmail: studentEmail, email: email, courseId: courseId  })
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
            setServerResponse({author: 'biva', text: r.answer})
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

    useEffect(()=>{
        makeServerGETRequest('/chatbot/getChatHistory')
        .then((req)=>{
            if(req && req.status === 200 && req.data){
                setChatHistory(req.data.chatHistory)
            }
        })
    }, [chatBotUrl])

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

    return <div className="border w-full h-full flex flex-col mx-auto relative">
        <div className="mb-auto bg-[#f8cdcd] h-max w-full p-4 flex ">
            <ImageTag src={biva} className='rounded-full'/>
            <p className="my-auto mx-2">Hi there. I am Biva. How can I help you?<span className="font-bold">({chatBotName ? chatBotName : 'Not Available'})</span></p>
            {/* <p className="my-auto mx-2 text-xs font-bold">{chatBotName}</p> */}
        </div>
        <div className="bg-[#f7e6e6] flex flex-col overflow-y-scroll h-full w-full p-4" ref={chatContainerRef}>
            {chatHistory.map((chat, index) => {
                return <div key={index}><MessageBox text={chat.text} author={chat.author} type={chat.type}/></div>
            })}
        </div>
        <div className="mt-auto bg-[#f8cdcd] h-max w-full p-4 flex ">
            <div className="flex flex-row bg-white h-max w-full p-2 rounded-lg">
                <Textinput value={inputText} onChange={(e) => setInputText(e.target.value)} className={'w-full h-max my-auto'} placeholder={'Type your message'} 
                onKeyDown = {handleEnterKey} />
                { loading
                    ?   <ReactLoading color="#dd0000" type="bars" height={40} width={40} className="my-auto"/>
                    :   <GeneralButton onClick={sendHandler} content={<ImageTag src={Send} />} disabled={inputText.length === 0} className={'w-max h-max p-4 my-auto disabled:cursor-not-allowed'}/>  
                }
            </div>
        </div>
    </div>
}