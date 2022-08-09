import React from "react";
// import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setToken, setAuthError, setCurrentUser } from "../../store/modules/user";
import user from "../../api/user";

export default function Kakao() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const href = window.location.href;
  let params = new URL(window.location.href).searchParams;
  let code = params.get("code");

  console.log(code);

  //토큰 저장
  const getKakaoToken = () => {
    user.kakaoSignup(code).then((result) => {
        const token = result.data.token;
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        user.currentUser().then((result) => {
          dispatch(setCurrentUser(result.data));
        });
        navigate('/', { replace: true });
      })
      .catch((error) => {
        dispatch(setAuthError(error.response.data.message));
        console.error(error);
      });
  };

  useEffect(() => {
    // if (!code) return;
    getKakaoToken();
  }, []);

  return <div>로그인중입니다</div>;
}
