import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import "./Header.css";
// 로고, 로그인 혹은 로그아웃 등
// 아래로 스크롤시 위로 사라지도록

export default function Header() {
  return (
    <header className="header">
      <div className="contents">
        <div className="start-header"></div>
        <div className="logo-header">
          <img src="img/logo.png" alt="logo" />
        </div>
        <div className="end-header">
          <AccountCircleTwoToneIcon />
        </div>
      </div>
    </header>
  );
}
