import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './HomePage'
import AllBots from './Bots/AllBots.js'
import Chat from './Chat/Chat.js'
import Chat2 from './Chat/Chat2.js'


function AppRoute () {

  return (
        <BrowserRouter>
            <Routes>

                <Route exact path="" element={
                    <Home /> 
                } />
                <Route
                    exact
                    path="allbots"
                    element={
                        <AllBots />
                    }
                />
                <Route exact path='chat' element={<Chat />} />
                <Route exact path='chat/v2' element={<Chat2 />} />
            </Routes>
        </BrowserRouter>
  )
}

export default AppRoute
