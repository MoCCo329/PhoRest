import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'

// functions
import user from '../api/user'
import { setCurrentUser } from '../store/modules/user'


export default function ProfileEditPw() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)

  const [newPassword, setNewPassword] = useState('')
  const [passwordValidity, setPasswordValidity] = useState('')
  const [passwordMatch, setPasswordMatch] = useState('')
  const [authError, setAuthError] = useState('')  // 회원정보 수정은 회원가입, 로그인 authError처럼 redux이용 X

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
      return alert('비밀번호를 정확히 입력해 주세요')
    }

    let form = document.forms.profileEdit.elements
    let credentials = {
      beforePassword : form.beforePassword.value,
      password : newPassword,
    }

    user.profileEditPw(credentials)
    .then((result) => {
      if (result.data===0) {
        dispatch(setCurrentUser(''))
        user.currentUser()
        .then(result => {
          dispatch(setCurrentUser(result.data))
        })
        alert('회원정보가 변경되었습니다.')
        navigate(`/mypage/${currentUser.username}`)
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
        <form name="profileEdit" onSubmit={(e) => {onSubmit(e)}}>
          <label htmlFor="Nickname">Nickname : </label>
          <input name="nickname" type="text" id="Nickname" defaultValue={ currentUser.nickname || '' } required placeholder="Nickname" /><br/>
          
          <label htmlFor="password">New Password : </label>
          <input name="Password" onChange={(e) => {setNewPassword(e.target.value); passwordFilter(e); passwordTest()}} type="password" id="password" required placeholder="New Password" /> {passwordValidity}<br/>
          <label htmlFor="password2">New Password Again : </label>
          <input name="password2" onChange={() => {passwordTest(); passwordTest()}} type="password" id="password2" required placeholder="New Password Again" /> {passwordMatch}<br/>
          
          기존 비밀번호 입력
          <label htmlFor="beforePassword">Password : </label>
          <input name="beforePassword" type="password" id="beforePassword" required placeholder="Password" /><br/>

          <button type="submit">Edit</button>
          { authError ? <p>{ authError }</p> : '' }
        </form>

        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </main>
    </Layout>
  )
}