import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'

import user from '../api/user'
import { setCurrentUser } from '../store/modules/user'

export default function ProfileDelete () {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [passwordValidity, setPasswordValidity] = useState('')
  const [passwordMatch, setPasswordMatch] = useState('')
  const [authError, setAuthError] = useState('')

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

    if (passwordValidity!=='' || passwordMatch!=='비밀번호가 일치합니다') {
      return alert('비밀번호를 정확히 입력해 주세요')
    }

    let credentials = {
      password : document.querySelector('#password').value
    }

    if (!window.confirm('정말 회원을 탈퇴하시겠습니까?')) {return}
    
    user.userDelete(credentials)
    .then((result) => {
      if (result.data===0) {
        localStorage.setItem('token', '')
        dispatch(setCurrentUser(''))
        user.currentUser()
        .then(result => {
          dispatch(setCurrentUser(result.data))
        })
        alert('성공적으로 탈퇴되었습니다.')
        navigate('/')
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
        <form name="profileDelete" onSubmit={onSubmit} >
          <label htmlFor="password">Password : </label>
          <input name="Password" onChange={(e) => {passwordFilter(e); passwordTest()}} type="password" id="password" required placeholder="Password" /> {passwordValidity}<br/>
          <label htmlFor="password2">Password Again : </label>
          <input name="password2" onChange={() => {passwordTest()}} type="password" id="password2" required placeholder="Password Again" /> {passwordMatch}<br/>

          <button type="submit">회원 탈퇴</button>
          { authError ? <p>{ authError }</p> : '' }
        </form>

        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </main>
    </Layout>
  )
}