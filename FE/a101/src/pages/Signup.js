import './Login.css'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ModalBasic from '../components/Utils/ModalBasic'

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
    const [isTesting, setIsTesting] = useState(false)
    const [phoneTestNumber, setPhoneTestNumber] = useState('')
    const [tested, setTested] = useState(false)

    const [idValidity, setIdValidity] = useState('')
    const [passwordValidity, setPasswordValidity] = useState('')
    const [passwordMatch, setPasswordMatch] = useState('')
    const [phoneValidity, setPhoneValidity] = useState('')
    const authError = useSelector(state => state.authError)

    // 모달용 변수 - basic
    const [showBasic, setShowBasic] = useState(false)
    let msg = ''
    const [message, setMessage] = useState('')
    const [onExit, setOnExit] = useState(false)
    // 모달용 함수 - basic
    const handleCloseBasic = () => setShowBasic(false)
    const setModalBasic = (msg) => {
        setShowBasic((showBasic) => {
            return !showBasic
        })
        setMessage(msg)
    }
    const setOnExitBasic = () => {
      setOnExit((onExit) => {
          return !onExit
      })
    }


    useEffect(() => {
      return () => {dispatch(setAuthError(''))}
    }, [])

    useEffect(() => {
      localStorage.setItem('token', '')
      user.currentUser()
      .then(result => {
        dispatch(setCurrentUser(result.data))
      })
      // setPhoneTestNumber('')
      // setTested(false)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setAuthError(''))

        if (idValidity) {
          msg = '아이디를 정확히 입력해 주세요'
          setModalBasic(msg)
          return
        }
        if (passwordValidity!=='' || passwordMatch!=='비밀번호가 일치합니다') {
          msg = '비밀번호를 정확히 입력해 주세요'
          setModalBasic(msg)
          return
        }
        if (phoneValidity) {
          msg = '핸드폰번호를 정확히 입력해 주세요'
          setModalBasic(msg)
          return
        }

        const credentials = {
            username : id,
            nickname : nickname,
            password : password,
            phone : phone.replace(/[^0-9a-zA-Z]/g, '')
        }
        
        user.signup(credentials)
        .then((result) => {
          msg = '회원가입이 완료되었습니다'
          setOnExitBasic()
          setModalBasic(msg)
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

      const check = /^[A-Za-z][A-Za-z\d]{4,50}$/
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
      let filtered = value.replace(/[^0-9]/g, '')
      
      if (filtered.length===3) {
        filtered = filtered.slice(0, 3)
      } else if (filtered.length >= 3 && filtered.length <= 6) {
        filtered = filtered.slice(0, 3) + '-' + filtered.slice(3)
      } else if (filtered.length > 6 && filtered.length <= 10) {
        filtered = filtered.slice(0, 3) + '-' + filtered.slice(3, 6) + '-' + filtered.slice(6)
      } else if (filtered.length >= 11) {
        filtered = filtered.slice(0, 3) + '-' + filtered.slice(3, 7) + '-' + filtered.slice(7)
      }
      e.target.value = filtered
      if (e.target.value.length === 12 || e.target.value.length === 13) {
        setPhoneValidity('')
      } else {
        setPhoneValidity('핸드폰번호는 10자 혹은 11자이여야 합니다')
      }
    }

    // const phoneTestFilter = (e) => {
    //   e.target.value = e.target.value.replace(/[^0-9]/g, '')
    // }

    // const phoneTestStart = (e) => {
    //   e.preventDefault()
    //   setIsTesting(true)
    //   user.phoneTest()
    //   .then(result => {
    //     setPhoneTestNumber(result.data)
    //     alert('메시지가 전송되었습니다')
    //   })
    // }

    // const phoneTestEnd = (e) => {
    //   e.preventDefault()
    //   let form = document.forms.signup.elements
    //   if (!!phoneTestNumber && form.phoneTestNumber.value===phoneTestNumber) {
    //     setTested(true)
    //     setIsTesting(false)
    //     alert('확인되었습니다')
    //   } else {
    //     setTested(false)
    //     alert('잘못된 인증번호입니다')
    //   }
    // }


    return (
      <Layout>
        <main>
          <div className='join-content'>
            <div className="login-header">
              <h5>PhoRest 회원가입하기</h5>
            </div>
            <form name="signup" onSubmit={(e) => {onSubmit(e)}}>
              <div>
                <label htmlFor="username">ID</label>
                <input onChange={(e)=>{setId(e.target.value); idFilter(e)}} type="text" id="username" required placeholder="아이디를 입력해주세요" autoFocus /> {idValidity}
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
                {/* <div className='phone-guide'>
                  {
                    isTesting ? 
                    <div><input id="phoneTestNumber" type="text" onChange={(e)=>{phoneTestFilter(e)}} placeholder='Certification Number'/><button onClick={(e) => phoneTestEnd(e)}>확인</button>
                    <button onClick={(e) => phoneTestStart(e)}>다시 보내기</button></div> : <button onClick={(e) => phoneTestStart(e)}>인증하기</button>
                  }
                </div> */}
                <div>01로 시작하는 숫자만 입력해 주세요 </div>
                <div>{phoneValidity}</div>
              </div>

              <button type="submit">Sign up</button>
            </form>
            { authError ? <p>{authError}</p> : ''}
            <div className='back-motion'>
              <div className='back-motion-btn' onClick={() => navigate(-1)}><img className='icon-img' src={back} alt='back'></img><div>뒤로가기</div></div>
            </div>
            <ModalBasic
              show={showBasic}
              onHide={handleCloseBasic}
              text={message}
              onExit={onExit ? () => {navigate("/login", { replace: true })} : null}
            />  
          </div>
        </main>
      </Layout>
    )
}