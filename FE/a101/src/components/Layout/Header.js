import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import "./Header.css"
import logo from './../../assets/logo.png'

import Profile from '../User/Profile'

// functions
import user from './../../api/user'
import { setDetailPost } from '../../store/modules/community' 

// 로고, 로그인 혹은 로그아웃 등
// 아래로 스크롤시 위로 사라지도록

export default function Header(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLoggedIn, setIsLoggedIn] = useState(false)  
  // const [mypage, setMypage] = useState(props.mypage)

  const currentUser = useSelector(state => state.currentUser)
  const userDetail = useSelector(state => state.userDetail)

  useEffect(() => {
    if (currentUser.username && localStorage.getItem('token')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [currentUser])

  // useEffect(() => {
  //   if (props.mypage) {
  //     setMypage(true)
  //   }
  // }, [])

  const clickLogout = () => {
    user.logout()
    .then(result => {
      if (result.data) {
        setIsLoggedIn(false)
        localStorage.setItem('token', '')
        user.currentUser()
        dispatch(setDetailPost(''))
      }
    })
  }
  // console.log(mypage)
  return (
    <header>
      <div className="contents">
        <div className="header-logo-box" style={{ marginLeft : props.mypage ? '3vw' : '48vw' }} onClick={() => {navigate('/')}}>
          <img className="header-logo" src={logo} alt="logo" />
          { props.mypage ? <div>{userDetail.nickname + "'s PhoRest"}</div> : null }
        </div>
        <div className='header-state'>
          {
            isLoggedIn ?
            <><Profile></Profile><button onClick={() => clickLogout()}>로그아웃</button></> :
            <><button onClick={() => navigate('/login')}>로그인</button><button onClick={() => navigate('/signup')}>회원가입</button></>
          }
        </div>
      </div>
    </header>
  );
}
