// import axios from 'axios'
import { makeServerRequest } from '../utils/helpers'
window.addEventListener('load', function () {
  console.log('script loaded from testscript')
})

// var link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'https://cdn.jsdelivr.net/gh/Amarnathiiti/chatbot@newfeatures/style.css';
// document.head.appendChild(link);

const div = document.createElement('div')
// const chatbotURL = 'https://chat.learnkraft.ai/api/predict'

div.innerHTML = `<div class="container lp-2 ">
                    <div class="chatbox">
                        <div class="chatbox__support max-w-md max-h-[410px] rounded-b-2xl">
                            <div class="chatbox__header flex flex-row">
                            <button class="cross__button" ><img class="absolute top-4 right-4 h-6 mb-4 ml-auto cursor-pointer bg-white rounded-full " src="/cross.svg" alt="X"/></button>
                                <div class="chatbox__image--header">
                                    <img src="/biva.png" alt="someimage" class="biva__image" />
                                </div>
                                <div class="chatbox__content--header">
                                    <h4 class="chatbox__heading--header" id="supportName">Chat support</h4>
                                       <p hidden id="chatbot_url">NA</p>
                                       <p hidden id="chatbot_name">NA</p>
                                        <p class="chatbox__description--header">Hi. My name is Biva. How can I help you?</p>
                                </div>
                            </div>
                            <div class="chatbox__messages">
                                <div></div>
                            </div>
                            <div class="chatbox__footer">
                                <input type="text" class="chatbox_input" placeholder="Write a message..." />
                                <button class="chatbox__send--footer send__button ">Send</button>
                            </div>
                        </div>
                        <div  style="width:100px;float:right">
                            <button class="chatbox__button " ><img class="rounded-full w-16 h-16" src="/biva.png" width="100px" alt="someImage"/></button>
                        </div>
                    </div>
                </div>`

document.body.appendChild(div)

let state = false
const messages = []
// const isServerOnline = false

const suggestedQuestions = {
  1: 'How do I access the mock tests',
  2: 'How do I contact customer support'
  // 3: 'Do I have to pay anything for giving quizzes',
  // 4: 'I am unable to give quizzes',
  // 5: 'How can I track my progress?'
}

Object.entries(suggestedQuestions).forEach(([key, value]) => {
  const msg = { name: 'suggestions', message: value }
  messages.push(msg)
})

// function fetchSuggestions() {
//   fetch('http://192.168.177.16:3044/fetch_suggestion', {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }).then(r => r.json())
//     .then(r => {
//       Object.entries(r).forEach(([key, value]) => {
//         const msg = { name: 'suggestions', message: value }
//         messages.push(msg)
//       })
//     })
// }

// function checkServerStatus() {
//   fetch('http://192.168.177.16:3044/fetch_suggestion', {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   }).then(r => {
//     if (r.status === 200)
//       isServerOnline = true
//     else
//       isServerOnline = false
//   })
//   return isServerOnline
// }

const openButton = document.querySelector('.chatbox__button')
const closeButton = document.querySelector('.cross__button')
const chatBox = document.querySelector('.chatbox__support')
const sendButton = document.querySelector('.send__button')

function display () {
  openButton.addEventListener('click', () => toggleState())
  closeButton.addEventListener('click', () => toggleState())

  sendButton.addEventListener('click', () => onSendButton())

  const node = document.querySelector('.chatbox_input')
  node.addEventListener('keyup', ({ key }) => {
    if (key === 'Enter') {
      onSendButton()
    }
  })
  // fetchSuggestions();
  updateChatText()
}

function toggleState () {
  state = !state
  // show or hides the box
  if (state) {
    chatBox.classList.add('chatbox--active')
  } else {
    chatBox.classList.remove('chatbox--active')
  }

  //   if (checkServerStatus()) {
  //     const msg = { name: 'notification', message: 'I am ready for your command.' }
  //     messages.push(msg)
  //   } else {
  //     const msg = { name: 'notification', message: 'Biva is not online. Please try after some time' }
  //     messages.push(msg)
  //   }
  updateChatText()
}

// const onSendButton = async () => {
//   try {
//     const response = await axios({
//       method: 'POST',
//       url: `${chatbotURL}`,
//       headers: { 'content-type': 'application/JSON' },
//       data: {
//         message: 'hello',
//         type: 'user_input'
//       }
//     })
//     return response
//   } catch (error) {
//     return error.response
//   }
// }

// function onSendButton2 () {
//   const textField = document.querySelector('.chatbox_input')
//   const text1 = textField.value
//   if (text1 === '') {
//     return
//   }

//   const msg1 = { name: 'User', message: text1 }
//   messages.push(msg1)

//   fetch(chatbotURL, {
//     method: 'POST',
//     body: JSON.stringify({ message: text1, type: 'user_input' }),
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(r => r.json())
//     .then(r => {
//       if (r.type === 'suggestions') {
//         const msg = { name: 'suggestions', message: r.answer }
//         messages.push(msg)
//       } else {
//         const msg2 = { name: 'Biva', message: r.answer }
//         messages.push(msg2)
//       }
//       updateChatText()
//       textField.value = ''
//     }).catch((error) => {
//       const msg3 = { name: 'Biva', message: 'Unable to get response local.' }
//       messages.push(msg3)
//       updateChatText()
//       textField.value = ''
//     })
// }

async function onSendButton () {
  const textField = document.querySelector('.chatbox_input')
  const text1 = textField.value
  if (text1 === '') {
    return
  }
  const chatbotname = document.getElementById('chatbot_name')
  const chatbotnameValue = chatbotname.innerText
  if (chatbotnameValue === 'NA') {
    return
  }
  const chatbotURL = document.getElementById('chatbot_url')
  const chatbotURLValue = chatbotURL.innerText
  if (chatbotURLValue === 'NA') {
    return
  }

  const msg1 = { name: 'User', message: text1 }
  messages.push(msg1)
  updateChatText()
  const res = await makeServerRequest('/chatBot/getAnswer', 'POST', { message: text1, url: chatbotURLValue, chatBotName:chatbotnameValue })
  if (res !== undefined) {
    const r = res.data
    if (r.type === 'suggestions') {
      const msg = { name: 'suggestions', message: r.answer }
      messages.push(msg)
    } else {
      const msg2 = { name: 'Biva', message: r.answer }
      messages.push(msg2)
    }
  } else {
    const msg = { name: 'notification', message: 'unknown error occured' }
    messages.push(msg)
  }
  updateChatText()
  textField.value = ''
}

async function querySuggestions (text) {
  const msg4 = { name: 'User', message: text }
  messages.push(msg4)

  const textField = document.querySelector('.chatbox_input')
  textField.value = text

  const res = await makeServerRequest('/chatBot/getAnswer', 'POST', { message: text, type: 'suggestions' })

  if (res !== undefined) {
    const r = res.data
    if (r.type === 'suggestions') {
      if (r.answer) {
        const msg = { name: 'suggestions', message: r.answer }
        messages.push(msg)
      } else {
        const msg = { name: 'suggestions', message: 'Invalid Query.' }
        messages.push(msg)
      }
    } else {
      const msg2 = { name: 'Biva', message: r.answer }
      messages.push(msg2)
    }
  } else {
    const msg = { name: 'notification', message: 'unknown error occured' }
    messages.push(msg)
  }
  updateChatText()
  textField.value = ''
}

function updateChatText () {
  let html = ''
  messages.slice().reverse().forEach(function (item, index) {
    if (item.name === 'notification') {
      html += '<div class="messages__item messages__item--notification">' + item.message + '</div>'
    } else if (item.name === 'suggestions') {
      html += '<div class="messages__item messages__item--suggestion"><button class="server_suggestion_button" >' + item.message + '</button></div>'
    } else if (item.name === 'Biva') {
      html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
    } else {
      html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
    }
  })

  const chatmessage = document.querySelector('.chatbox__messages')
  chatmessage.innerHTML = html
  const serverResponseButton = document.querySelectorAll('.server_suggestion_button')
  if (serverResponseButton !== null) {
    serverResponseButton.forEach((button) => {
      button.addEventListener('click', () => querySuggestions(button.innerHTML))
    })
  }
}

display()
