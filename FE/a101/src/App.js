/* eslint-disable */

import './App.css'
import { React, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// pages
import Main from './pages/Main'
import Download from './pages/Download'
import Mypage from './pages/Mypage'
import Community from './pages/Community'
import FrameEdit from './pages/FrameEdit'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProfileEdit from './pages/ProfileEdit'
import FollowingList from './pages/FollowingList'
import NotFount404 from './pages/NotFound404'

// functions
import user from './api/user'
import { setCurrentUser } from './store/modules/user'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    user.currentUser()
    .then(result => {
      dispatch(setCurrentUser(result.data))
    })
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/download/:postId" element={<Download/>} />
        <Route exact path="/mypage/edit" element={<ProfileEdit/>} />
        <Route exact path="/mypage/following" element={<FollowingList/>} />
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