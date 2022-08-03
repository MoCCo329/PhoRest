/* eslint-disable */

import './App.css'
import { React, useEffect } from 'react'
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// pages
import Main from './pages/Main'
import Download from './pages/Download'
import Mypage from './pages/Mypage'
import Community from './pages/Community'
import FrameEdit from './pages/FrameEdit'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NotFount404 from './pages/NotFound404'

// functions


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/download/:postId" element={<Download/>} />
        <Route exact path="/mypage/:username" element={<Mypage/>} />
        <Route exact path="/mypage" element={<Mypage/>} />        
        <Route exact path="/community/:postId" element={<Community/>} />
        <Route exact path="/frameEdit" element={<FrameEdit/>} />
        <Route exact path="/signup" element={<Signup/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="*" element={<NotFount404/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
