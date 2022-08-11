import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import "./Header.css"
import logo from './../../assets/logo.png'

import Profile from '../User/Profile'

// functions
import user from './../../api/user'
import { setCurrentUser } from '../../store/modules/user'
import { setDetailPost } from '../../store/modules/community' 

// icon
import logout from '../../assets/UI/logout.png'

// 로고, 로그인 혹은 로그아웃 등
// 아래로 스크롤시 위로 사라지도록

export default function Header(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const currentUser = useSelector(state => state.currentUser)
  const userDetail = useSelector(state => state.userDetail)

  useEffect(() => {
    if (currentUser.username && localStorage.getItem('token')) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [currentUser])

  const clickLogout = () => {
    user.logout()
    .then(result => {
      if (result.data) {
        setIsLoggedIn(false)
        localStorage.setItem('token', '')
        dispatch(setCurrentUser(''))
        user.currentUser()
        dispatch(setDetailPost(''))

      }
    })
  }

  return (
    <header>
      <div className="contents">
        <div className="header-logo-box" onClick={() => {navigate('/')}}>
          <img className="header-logo" src={logo} alt="logo" />
          { props.mypage ? null : <div className='header-logo-phorest'>PhoRest</div> }
          { props.mypage ? <div className='user-nickname'>{userDetail.nickname + "'s PhoRest"}</div> : null }
        </div>
        <div className='header-state'>
          {
            isLoggedIn ?
            <div className='profile-info-box'>
              <div><Profile user={currentUser}></Profile></div>
              <img className='logout-btn' src={logout} alt='logout' onClick={() => clickLogout()}></img>
            </div>
             :
            <div><button className='login-btn' onClick={() => navigate('/login')}>Login</button></div>
          }
        </div>
      </div>
    </header>
  );
}