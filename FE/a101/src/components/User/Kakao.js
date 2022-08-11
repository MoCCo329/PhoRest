import React from "react"
// import { useDispatch } from 'react-redux'
import './Kakao.css'

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { setToken, setAuthError, setCurrentUser } from "../../store/modules/user"
import user from "../../api/user"

// spinner
import spinner from '../../assets/UI/spinner.gif'

export default function Kakao() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  let params = new URL(window.location.href).searchParams
    let code = params.get("code")


  //토큰 저장
  const getKakaoToken = () => {
    user.kakaoSignup(code)
    .then((result) => {
      const token = result.data.token
      dispatch(setToken(token))
      localStorage.setItem("token", token)
      user.currentUser()
      .then(result => {
        dispatch(setCurrentUser(result.data));
      })
      setLoading(false)
      navigate(-2, { replace: true })
    })
    .catch((error) => {
      dispatch(setAuthError(error.response.data.message))
      setLoading(false)
      alert('로그인에 실패했습니다')
      navigate('/login')
    })
  }

  useEffect(() => {
    // if (!code) return;
    getKakaoToken()
  }, [])

  
  return (
  <div id="kakao-login">
    {loading ? <img src={spinner} alt='spinner'></img> : null}
    <h5>로그인 중입니다</h5>
  </div>)
}
