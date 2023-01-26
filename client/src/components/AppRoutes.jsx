import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Chat from './Chat';
import Main from './Main';

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/chat" element={<Chat/>}/>
    </Routes>
  )
}

export default AppRoutes