import logo from "./../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./NavMypage.css";

export default function NavHeader(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="nav-mypage-contents">
        <div
          className="nav-header-logo-box"
          onClick={() => {
            navigate("/");
          }}
        >
          <img className="nav-header-logo" src={logo} alt="로고" />
        </div>

        <div className="username">{props.nickname + "'s PhoRest"}</div>
      </div>
    </div>
  );
}
