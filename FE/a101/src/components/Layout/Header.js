import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import "./Header.css";
import logo from './../../assets/logo.png'
// 로고, 로그인 혹은 로그아웃 등
// 아래로 스크롤시 위로 사라지도록

export default function Header() {
  return (
    <header>
      <div className="contents">
        <div className="header-logo-box">
          <img className="header-logo" src={logo} alt="logo" />
        </div>
        <nav>
          {/* 로그인 되어있다면 profile 로그아웃, 아니면 회원가입 로그인 */}
          <AccountCircleTwoToneIcon className="header-profile"/>
        </nav>
      </div>
    </header>
  );
}
