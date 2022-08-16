import './Login.css'

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import Layout from "../components/Layout/Layout"

import { setToken, setAuthError, setCurrentUser } from "../store/modules/user"
import user from "../api/user"

// 카카오 로그인 이미지
// import kakaoBtn from "../assets/UI/kakao_login_medium_wide.png"
import kakaoSymbol from '../assets/UI/kakao_symbol.png'
import { REST_API_KEY, REDIRECT_URI } from '../components/User/KakaoData'

export default function Main() {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let [id, setId] = useState("")
  let [password, setPassword] = useState("")
  let authError = useSelector((state) => state.authError)

  useEffect(() => {
    return () => {
      dispatch(setAuthError(""))
    }
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(setAuthError(""))
    const credentials = {
      username: id,
      password: password,
    }
    user
      .login(credentials)
      .then((result) => {
        const token = result.data.token
        dispatch(setToken(token))
        localStorage.setItem("token", token)
        user.currentUser().then((result) => {
          dispatch(setCurrentUser(result.data))
        })
        navigate(-1, { replace: true })
      })
      .catch((error) => {
        dispatch(setAuthError(error.response.data.fieldErrors[0].defaultMessage))
        console.error(error)
      })
  }


  // 카카오 로그인
  const url =
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`

  function login() {
    window.location.href = url
  }
  return (
    <Layout>
      <main>
        <div className='login-content'>
          <div className="login-header">
            <h5>PhoRest 로그인하기</h5>
          </div>
          <div id='kakao-login-btn' onClick={login}>
            <img src={kakaoSymbol} alt="카카로 로그인"/>
            <span>카카오 로그인</span>
          </div>
          <div className='hr-sect'>
            또는
          </div>
          <form
            onSubmit={(e) => {
              onSubmit(e)
            }}
          >
            <div>
              <label htmlFor="username">ID</label>
              <input
                onChange={(e) => {
                  setId(e.target.value)
                }}
                type="text"
                id="username"
                required
                autoFocus
                placeholder="아이디를 입력해주세요"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                type="password"
                id="password"
                required
                placeholder="비밀번호를 입력해주세요"
              />
              {authError ? <p>{authError}</p> : ""}
            </div>
            <button type="submit">login</button>
          </form>
          <div className='join-paging'>
            <span>아직 회원이 아니신가요?</span>
            <span className='join-paging-btn' onClick={() => navigate("/signup", { replace: true })} style={{color: '#4646CD'}}>
              회원가입
            </span>
          </div>
        </div>
      </main>
    </Layout>
  )
}