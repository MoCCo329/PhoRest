/* eslint-disable */

import { React, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// pages
import Main from './pages/Main'
import Download from './pages/Download'
import Mypage from './pages/Mypage'
import Community from './pages/Community'
import FrameEdit from './pages/FrameEdit'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ProfileEdit from './pages/ProfileEdit'
import ProfileEditPw from './pages/ProfileEditPw'
import ProfileDelete from './pages/ProfileDelete'
import NotFount404 from './pages/NotFound404'
import Kakao from './pages/Kakao'
import Ar from './pages/Ar'

// functions
import user from './api/user'
import { setCurrentUser } from './store/modules/user'

// css
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function App () {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
  
  useEffect(() => {
    user.currentUser()
    .then(result => {
      dispatch(setCurrentUser(result.data))
    })
  }, [window.location.pathname])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>} />
        <Route exact path="/photogroup" element={<Main category='photogroup' />} />
        <Route exact path="/frame" element={<Main category='frame' />} />

        <Route exact path="/download/:postId" element={<Download/>} />

        {
          currentUser && currentUser.username ?
          <>
            <Route exact path="/mypage/edit" element={<ProfileEdit/>} />
            <Route exact path="/mypage/editpw" element={<ProfileEditPw/>} />
            <Route exact path="/mypage/delete" element={<ProfileDelete/>} />
          </> : null
        }

        <Route exact path="/mypage/:username" element={<Mypage/>} />
        <Route exact path="/community/edit/:postId" element={<FrameEdit/>} />
        <Route exact path="/community/:postId" element={<Community/>} />

        {
          !currentUser || !currentUser.username ?
          <>
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/kakao" element={<Kakao/>} />  
          </> : null
        }

        <Route exact path="/ar" element={<Ar/>} />
        <Route exact path="*" element={<NotFount404/>} />
      </Routes>
    </BrowserRouter>
  )
}