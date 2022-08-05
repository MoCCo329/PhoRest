import { useState, useEffect, useDebugValue } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setToken, setCurrentUser } from '../store/modules/member'

// functions
import member from '../api/member'


export default function ProfileEdit() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)
  console.log(user)

  const [nickname, setNickname] = useState(user.nickname)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [phone, setPhone] = useState(user.phone)
  const [profileUrl, setProfileUrl] = useState(user.profileUrl)
  let [passwordValidity, setPasswordValidity] = useState('')
  let [authError, setAuthError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (passwordValidity==="Passwords match") {
      setAuthError('')

      const credentials = {
          username : user.id,
          nickname : nickname,
          password : password,
          phone : phone,
          profileUrl : profileUrl
      }

      member.profileEdit(credentials)
      .then((result) => {
          if (result.data===0) {
            member.currentUser()
            .then(result => {
              dispatch(setCurrentUser(result.data))
            })
          } else if (result.data===1) {
            setAuthError('잘못된 접근입니다. (로그인 되어있지 않음)')
          } else if (result.data===2) {
            setAuthError('중복된 닉네임이 존재합니다.')
          } else {
            setAuthError('중복된 핸드폰 번호가 존재합니다.')
          }
      })
      .catch((error) => {
          console.error(error.response)
      })
    } else {
        alert('비밀번호가 일치하지 않습니다')
    }

  }

  const passwordTest = (value) => {
    if (value === '') {
        setPasswordValidity('')
    } else if (value !== password) {
        setPasswordValidity('Passwords do not match')
    } else {
        setPasswordValidity('Passwords match')
    }
  }

  return (
    <div>
      <form onSubmit={(e) => {onSubmit(e)}}>
        <label htmlFor="Nickname">Nickname : </label>
        <input onChange={(e)=>{setNickname(e.target.value)}} type="text" id="Nickname" value={ nickname || '' } required placeholder="Nickname" /><br/>
        <label htmlFor="password">New Password : </label>
        <input onChange={(e)=>{setNewPassword(e.target.value)}} type="password" id="password" required placeholder="New Password" /><br/>
        <label htmlFor="password2">New Password Again : </label>
        <input onChange={(e)=>{passwordTest(e.target.value)}} type="password" id="password2" required placeholder="New Password Again" /> {passwordValidity}<br/>
        <label htmlFor="phone">Phone : </label>
        <input onChange={(e)=>{setPhone(e.target.value)}} type="number" id="phone" value={ phone || '' } required placeholder="phone" /><br/>
        <label htmlFor="ProfileUrl">Profile Image : </label>
        { profileUrl ? <img src={ profileUrl } alt="profileImg"></img> : null }
        <input onChange={(e)=>{setProfileUrl(e.target.value)}} type="file" id="ProfileUrl" /><br/>


        <label htmlFor="beforePassword">Password : </label>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="beforePassword" required placeholder="Password" /><br/>
        <button type="submit">Edit</button>
        { authError ? <p>{authError}</p> : '' }
      </form>
    </div>
  )
}