import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import "./Header.css"
import logo from './../../assets/logo.png'

import Profile from '../User/Profile'

// functions
import user from './../../api/user'

// 로고, 로그인 혹은 로그아웃 등
// 아래로 스크롤시 위로 사라지도록

export default function Header() {
  const navigate = useNavigate()

  const userDetail = useSelector(state => state.currentUser)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (userDetail.username && localStorage.getItem('token')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [userDetail])

  const clickLogout = () => {
    user.logout()
    .then(result => {
      if (result.data) {
        setIsLoggedIn(false)
        localStorage.setItem('token', '')
        user.currentUser()
      }
    })
  }

  return (
    <header>
      <div className="contents">
        <div className="header-logo-box" onClick={() => {navigate('/')}}>
          <img className="header-logo" src={logo} alt="logo" />
        </div>
        <button onClick={() => navigate('/mypage/edit')}>회원정보 수정(임시)</button>
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
