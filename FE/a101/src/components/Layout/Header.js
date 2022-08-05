import { useNavigate } from 'react-router-dom'

import "./Header.css"
import logo from './../../assets/logo.png'

import Profile from '../Member/Profile'

// 로고, 로그인 혹은 로그아웃 등
// 아래로 스크롤시 위로 사라지도록

export default function Header() {
  const navigate = useNavigate()

  return (
    <header>
      <div className="contents">
        <div className="header-logo-box" onClick={() => {navigate('/')}}>
          <img className="header-logo" src={logo} alt="logo" />
        </div>
        <nav>
          {/* 로그인 되어있다면 profile 로그아웃, 아니면 회원가입 로그인 */}
          <Profile></Profile>
        </nav>
      </div>
    </header>
  );
}
