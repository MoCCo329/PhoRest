import React from "react"
import './Kakao.css'

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { setToken, setAuthError, setCurrentUser } from "../store/modules/user"
import user from "../api/user"

// function
import ModalBasic from '../components/Utils/ModalBasic'

// spinner
import spinner from '../assets/UI/spinner.gif'

export default function Kakao() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  let params = new URL(window.location.href).searchParams
  let code = params.get("code")

  // 모달용 변수 - basic
  const [showBasic, setShowBasic] = useState(false)
  let msg = ''
  const [message, setMessage] = useState('')

  // 모달용 함수 - basic
  const handleCloseBasic = () => setShowBasic(false)
  const setModalBasic = (msg) => {
      setShowBasic((showBasic) => {
          return !showBasic
      })
      setMessage(msg)
  }

  //토큰 저장
  const getKakaoToken = () => {
    user.kakaoSignup(code)
    .then((result) => {
      const token = result.data.token
      dispatch(setToken(token))
      localStorage.setItem("token", token)
      user.currentUser()
      .then(result => {
        dispatch(setCurrentUser(result.data))
      })
      setLoading(false)
      navigate(-1, { replace: true })
      // navigate('/',  { replace: true })
    })
    .catch((error) => {
      dispatch(setAuthError(error.response.data.message))
      setLoading(false)
      msg = '로그인에 실패했습니다'
      setModalBasic(msg)
      navigate('/login')
    })
  }

  useEffect(() => {
    getKakaoToken()
  }, [])

  
  return (
  <div id="kakao-login">
    {loading ? <img src={spinner} alt='spinner'></img> : null}
    <h5>로그인 중입니다</h5>
    <ModalBasic
      show={showBasic}
      onHide={handleCloseBasic}
      text={message}
    />   
  </div>)
}
