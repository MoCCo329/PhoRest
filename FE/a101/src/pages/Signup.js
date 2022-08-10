import './Login.css'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'

import user from '../api/user'
import { setAuthError, setCurrentUser } from '../store/modules/user'

// icon
import back from '../assets/UI/back.png'

export default function Main() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const [id, setId] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')

    const [idValidity, setIdValidity] = useState('')
    const [passwordValidity, setPasswordValidity] = useState('')
    const [passwordMatch, setPasswordMatch] = useState('')
    const [phoneValidity, setPhoneValidity] = useState('')
    const authError = useSelector(state => state.authError)

    useEffect(() => {
      return () => {dispatch(setAuthError(''))}
    }, [])

    useEffect(() => {  // 로그인 되어있으면 아예 못들어오게 바꿔야함
      localStorage.setItem('token', '')
      user.currentUser()
      .then(result => {
        dispatch(setCurrentUser(result.data))
      })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setAuthError(''))

        if (idValidity) {
          return alert('아이디를 정확히 입력해 주세요')
        }
        if (passwordValidity!=='' || passwordMatch!=='비밀번호가 일치합니다') {
          return alert('비밀번호를 정확히 입력해 주세요')
        }
        if (phoneValidity) {
          return alert('핸드본번호를 정확히 입력해 주세요')
        }

        const credentials = {
            username : id,
            nickname : nickname,
            password : password,
            phone : phone
        }
        
        user.signup(credentials)
        .then((result) => {
          alert('회원가입이 완료되었습니다')
          navigate("/login", { replace: true })
        })
        .catch((error) => {
          if (error.response.data.message==='@Valid Error') {
            let errorMessage = `${error.response.data.fieldErrors[0].field} : ${error.response.data.fieldErrors[0].defaultMessage}`
            dispatch(setAuthError(errorMessage))
          } else {
            dispatch(setAuthError(error.response.data.message))
          }
        })
    }

    const idFilter = (e) => {
      const { value } = e.target
      const filtered = value.replace(/[^0-9a-zA-Z]/g, '')
      e.target.value = filtered

      const check = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/
      if (e.target.value.length < 5) {
        setIdValidity('아이디는 5자 이상이여야 합니다')
      } else if (!check.test(value)) {
        setIdValidity('아이디는 각각 하나이상의 알파벳과 숫자를 포함해야 합니다')
      } else {
        setIdValidity('')
      }
    }

    const passwordFilter = (e) => {
      const { value } = e.target
      const filtered = value.replace(/[^0-9a-zA-Z~!@#$%^&*()=|+]/g, '')
      e.target.value = filtered
      if (e.target.value.length < 8) {
        setPasswordValidity('비밀번호는 8자 이상이여야 합니다')
      } else {
        setPasswordValidity('')
      }
    }

    const passwordTest = () => {
      const password1 = document.querySelector('#password').value
      const password2 = document.querySelector('#password2').value
      if (password2 === '') {
        setPasswordMatch('')
      } else if (password1===password2) {
        setPasswordMatch('비밀번호가 일치합니다')
      } else {
        setPasswordMatch('비밀번호가 일치하지 않습니다')
      }
    }

    const phoneFilter = (e) => {
      const { value } = e.target
      const filtered = value.replace(/[^0-9]/g, '')
      e.target.value = filtered
      if (e.target.value.length === 10 || e.target.value.length === 11) {
        setPhoneValidity('')
      } else {
        setPhoneValidity('핸드폰번호는 10자 혹은 11자이여야 합니다')
      }
    }

    return (
      <Layout>
        <main>
          <div className='join-content'>
          <div className="login-header">
            <h5>PhoRest 회원가입하기</h5>
          </div>
            <form onSubmit={(e) => {onSubmit(e)}}>
              <div>
                <label htmlFor="username">ID</label>
                <input onChange={(e)=>{setId(e.target.value); idFilter(e)}} type="text" id="username" required placeholder="아이디를 입력해주세요" /> {idValidity}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input onChange={(e)=>{setPassword(e.target.value); passwordFilter(e); passwordTest()}} type="password" id="password" required placeholder="비밀번호를 입력해주세요" /> {passwordValidity}
              </div>

              <div>
                <label htmlFor="password2">Password Again</label>
                <input onChange={(e)=>{passwordTest()}} type="password" id="password2" required placeholder="비밀번호를 다시 입력해주세요" /> {passwordMatch}
              </div>

              <div>
                <label htmlFor="nickname">Nickname</label>
                <input onChange={(e)=>{setNickname(e.target.value)}} type="text" id="nickname" required placeholder="별명을 입력해주세요" />
              </div>

              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input onChange={(e)=>{setPhone(e.target.value); phoneFilter(e)}} type="text" id="phoneNumber" required placeholder="핸드폰 번호를 입력해주세요" />
                <div className='phone-guide'>
                  <div>01로 시작하는 숫자만 입력해 주세요 </div>
                  <div>{phoneValidity}</div>
                </div>
              </div>

              <button type="submit">Sign up</button>
            </form>
            { authError ? <p>{authError}</p> : ''}
            <div className='back-motion'>
              <div className='back-motion-btn' onClick={() => navigate(-1)}><img className='icon-img' src={back} alt='back'></img><div>뒤로가기</div></div>
            </div>
          </div>
        </main>
      </Layout>
    )
}