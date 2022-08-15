import './ProfileEdit.css'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ModalBasic from '../components/Utils/ModalBasic'
import ModalConfirm from '../components/Utils/ModalConfirm'

import user from '../api/user'
import { setCurrentUser } from '../store/modules/user'

// icon
import back from '../assets/UI/back.png'

export default function ProfileDelete () {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [isKakao, setIsKakao] = useState(false)
  const [passwordValidity, setPasswordValidity] = useState('')
  const [passwordMatch, setPasswordMatch] = useState('')
  const [authError, setAuthError] = useState('')
  const currentUser = useSelector(state => state.currentUser)

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

  // 모달용 변수 - confirm
  const [show, setShow] = useState(false)
  let todo = ''
  const [toDo, setToDo] = useState('')
  // 모달용 함수 - confirm
  const handleClose = () => setShow(false)
  const setModal = (msg, todo) => {
      setShow((show) => {
          return !show
      })
      setMessage(msg)
      setToDo(todo)
  }

  useEffect(() => {
    if (currentUser.kakao) {
      setIsKakao(true)
    }
  }, [currentUser])
  
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

  const onSubmit = (event) => {
    event.preventDefault()
    setAuthError('')

    if (!isKakao && (passwordValidity!=='' || passwordMatch!=='비밀번호가 일치합니다')) {
      msg = '비밀번호를 정확히 입력해 주세요'
      setModalBasic(msg)
      return
    }

    // let credentials = {}
    // if (!isKakao) {
    //   credentials = {
    //     password : document.querySelector('#password').value
    //   }
    // }
    msg = '정말 회원을 탈퇴하시겠습니까?'
    todo = '탈퇴'
    setModal(msg, todo)
  }

  const userDeleteConfirmed = () => {
    let credentials = {}
    if (!isKakao) {
      credentials = {
        password : document.querySelector('#password').value
      }
    }

    user.userDelete(credentials)
    .then((result) => {
      if (result.data===0) {
        localStorage.setItem('token', '')
        dispatch(setCurrentUser(''))
        user.currentUser()
        .then(result => {
          dispatch(setCurrentUser(result.data))
          msg = '탈퇴가 완료되었습니다'
          setOnExitBasic()
          setModalBasic(msg)
        })
        // alert('탈퇴가 완료되었습니다')
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

  return (
    <Layout>
      <main>
        <div className='profile-delete-content'>
          <div className="login-header">
            <h5>회원 탈퇴하기</h5>
          </div>
          <form name="profileDelete" onSubmit={onSubmit} >
            {
              !isKakao &&
              <div>
                <label htmlFor="password">Password</label>
                <input name="Password" onChange={(e) => {passwordFilter(e); passwordTest()}} type="password" id="password" required placeholder="비밀번호를 입력해주세요" /> {passwordValidity}<br/>
                <label htmlFor="password2">Password Again</label>
                <input name="password2" onChange={() => {passwordTest()}} type="password" id="password2" required placeholder="비밀번호를 다시 입력해주세요" /> {passwordMatch}<br/>
              </div>
            }
            <button type="submit">회원 탈퇴</button>
            { authError ? <p>{ authError }</p> : '' }
          </form>

          <div className='back-motion'>
              <div className='back-motion-btn' onClick={() => navigate(-1)}><img className='icon-img' src={back} alt='back'></img><div>뒤로가기</div></div>
            </div>
        </div>
        <ModalBasic
          show={showBasic}
          onHide={handleCloseBasic}
          text={message}
          onExit={onExit ? () => {navigate('/')} : null}
        /> 
        <ModalConfirm
          show={show}
          onHide={handleClose}
          text={message}
          action={userDeleteConfirmed}
          todo={toDo}
        />
      </main>
    </Layout>
  )
}