import './ProfileEdit.css'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ModalBasic from '../components/Utils/ModalBasic'

// functions
import user from '../api/user'
import { setCurrentUser, updateCurrentUser } from '../store/modules/user'

// icon
import back from '../assets/UI/back.png'

export default function ProfileEditPw() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)

  const [newPassword, setNewPassword] = useState('')
  const [passwordValidity, setPasswordValidity] = useState('')
  const [passwordMatch, setPasswordMatch] = useState('')
  const [authError, setAuthError] = useState('')

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
    if (currentUser.kakao) {
      navigate('/')
    }
  }, [currentUser])

  useEffect(() => {
    user.currentUser()
    .then(result =>
      dispatch(setCurrentUser(result.data)))
  }, [])

  
  const onSubmit = (event) => {
    event.preventDefault()
    setAuthError('')

    if (passwordValidity!=='' || passwordMatch!=='비밀번호가 일치합니다') {
      msg = '비밀번호를 정확히 입력해 주세요'
      setModalBasic(msg)
      return
    }

    let form = document.forms.profileEdit.elements
    let credentials = {
      beforePassword : form.beforePassword.value,
      password : newPassword,
    }

    user.profileEditPw(credentials)
    .then((result) => {
      if (result.data===0) {
        user.currentUser()
        .then(result => {
          dispatch(updateCurrentUser(result.data))
          msg = '비밀번호가 변경되었습니다'
          setOnExitBasic()
          setModalBasic(msg)
        })
      } else if (result.data===1) {
        setAuthError('잘못된 접근입니다.')
      } else if (result.data===2) {
        setAuthError('비밀번호가 틀립니다.')
      }
    })
    .catch((error) => {
      if (error.response.data.message==='@Valid Error') {
        let errorMessage = `${error.response.data.fieldErrors[0].field} : ${error.response.data.fieldErrors[0].defaultMessage}`
        setAuthError(errorMessage)
      } else {
        setAuthError(error.response.data.message)
      }
    })
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


  return (
    <Layout>
      <main>
        <div className='pw-edit-content'>
          <div className="login-header">
            <h5>비밀번호 변경하기</h5>
          </div>
          <form name="profileEdit" onSubmit={(e) => {onSubmit(e)}}>
            <div>
              기존 비밀번호 입력
              <label htmlFor="beforePassword">Password : </label>
              <input name="beforePassword" type="password" id="beforePassword" required placeholder="기존 비밀번호를 입력해주세요" />
            </div>

            <div>  
              <label htmlFor="password">New Password</label>
              <input name="Password" onChange={(e) => {setNewPassword(e.target.value); passwordFilter(e); passwordTest()}} type="password" id="password" required placeholder="새로운 비밀번호를 입력해주세요" />
              {passwordValidity}
            </div>

            <div>
              <label htmlFor="password2">New Password Again</label>
              <input name="password2" onChange={() => {passwordTest()}} type="password" id="password2" required placeholder="비밀번호를 다시 입력해주세요" />
              {passwordMatch}
            </div>     
            

            <button type="submit">Edit</button>
            { authError ? <p>{ authError }</p> : '' }
          </form>

          <div className='back-motion'>
            <div className='back-motion-btn' onClick={() => navigate(-1)}><img className='icon-img' src={back} alt='back'></img><div>뒤로가기</div></div>
          </div>
          <ModalBasic
          show={showBasic}
          onHide={handleCloseBasic}
          text={message}
          onExit={onExit ? () => {navigate(`/mypage/${currentUser.username}`)} : null}
        />  
        </div>
      </main>
    </Layout>
  )
}