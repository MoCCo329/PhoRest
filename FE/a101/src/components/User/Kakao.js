import React from "react";
// import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../api/user";

export default function Kakao() {
  // const dispatch = useDispatch()
  const navigate = useNavigate();

  const href = window.location.href;
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");

  console.log(code);

  //토큰 저장
  const getKakaoToken = () => {
    user.kakaoSignup(code).then((result) => {
      console.log(result.data);
      localStorage.setItem("token", result.data.token);
    });
  };

  useEffect(() => {
    // if (!code) return;
    getKakaoToken();
  }, []);

  return <div>미들웨어입니다</div>;
}
