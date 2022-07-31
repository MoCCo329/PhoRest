import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

import members from './../api/members'
import { setAuthError } from '../store/modules/member'

export default function Main() {
    let [nickname, setNickname] = useState('')
    let [id, setId] = useState('')
    let [password, setPassword] = useState('')
    let [phone, setPhone] = useState('')
    let [passwordValidity, setPasswordValidity] = useState('')

    let dispatch = useDispatch()
    // let navigate = useNavigate()

    // useEffect로 가능? cleanup func로 기존 경고문고 지우기도

    const passwordTest = (value) => {
        if (value === '') {
            setPasswordValidity('')
        } else if (value !== password) {
            setPasswordValidity('Passwords do not match')
        } else {
            setPasswordValidity('Passwords match')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const credentials = {
            username : id,
            nickname : nickname,
            password : password,
            phone : phone,
        }

        members.signup(credentials)
        .then((result) => {
            // const token = result.data.key
            // dispatch(setToken(token))
            // localStorage.setItem("token", token)
            // members.currentUser()
            // navigate(-1)
          })
          .catch((error) => {
            dispatch(setAuthError(error.response))
            console.error(error.response.data)
          })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
              <label htmlFor="username">ID : </label>
              <input onChange={(e)=>{setId(e.target.value)}} type="text" id="username" required placeholder="ID" /><br/>
              <label htmlFor="password">Password : </label>
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" required placeholder="Password" /><br/>
              <label htmlFor="password2">Password Again : </label>
              <input onChange={(e)=>{passwordTest(e.target.value)}} type="password" id="password2" required placeholder="Password Again" /> {passwordValidity}<br/>
              <label htmlFor="nickname">Nickname : </label>
              <input onChange={(e)=>{setNickname(e.target.value)}} type="text" id="nickname" required placeholder="Nickname" /><br/>
              <label htmlFor="phoneNumber">Phone Number : </label>
              <input onChange={(e)=>{setPhone(e.target.value)}} type="number" id="phoneNumber" required placeholder="PhoneNumber" /><br/>
              <button type="submit">Sign up</button>
            </form>
            {/* AUTH_ERROR 있으면 보여주기 */}
        </div>
    )
}