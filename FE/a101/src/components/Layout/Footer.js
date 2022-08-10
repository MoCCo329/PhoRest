import "./Footer.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
// 페이지 맨 아래에 프로젝트 정보나 사이트 정보 표시

export default function Footer() {
  return (
    <footer className="footer">
      <h3>PHOREST {<CopyrightIcon />}</h3>
    </footer>
  );
}
