import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import user from '../api/user'
import { setAuthError } from '../store/modules/user'

export default function Main() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const [id, setId] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [passwordValidity, setPasswordValidity] = useState('')
    const [phoneValidity, setPhoneValidity] = useState('')
    const authError = useSelector(state => state.authError)

    useEffect(() => {
        return () => {dispatch(setAuthError(''))}
    }, [])

    const passwordTest = (value) => {
        if (value === '') {
          setPasswordValidity('')
        } else if (value !== password) {
          setPasswordValidity('Passwords do not match')
        } else if (value.length < 3) {
          setPasswordValidity('Password length should be 3 or more')
        } else {
          setPasswordValidity('Passwords match')
        }
      }

    const phoneTest = (value) => {
        if (value.length === 11 || value.length === 0) {
          setPhoneValidity('')
        } else {
          setPhoneValidity('Phone number should have length of 11')
        }
      }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(setAuthError(''))
        if (phoneValidity==="Phone number should have length of 11") {
            return alert('핸드본번호를 정확히 입력해 주세요')
        }

        if (passwordValidity==="Passwords match") {
            const credentials = {
                username : id,
                nickname : nickname,
                password : password,
                phone : phone
            }
            user.signup(credentials)
            .then((result) => {
                alert('회원가입이 완료되었습니다')
                navigate("/login")
            })
            .catch((error) => {
                dispatch(setAuthError(error.response.data.message))
                console.error(error.response)
            })
        } else {
            alert('비밀번호가 잘못되었습니다')
        }
    }

    return (
        <div>
            <form onSubmit={(e) => {onSubmit(e)}}>
              <label htmlFor="username">ID : </label>
              <input onChange={(e)=>{setId(e.target.value)}} type="text" id="username" required placeholder="ID" /><br/>
              <label htmlFor="password">Password : </label>
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" required placeholder="Password" /><br/>
              <label htmlFor="password2">Password Again : </label>
              <input onChange={(e)=>{passwordTest(e.target.value)}} type="password" id="password2" required placeholder="Password Again" /> {passwordValidity}<br/>
              <label htmlFor="nickname">Nickname : </label>
              <input onChange={(e)=>{setNickname(e.target.value)}} type="text" id="nickname" required placeholder="Nickname" /><br/>
              <label htmlFor="phoneNumber">Phone Number : </label>
              <input onChange={(e)=>{setPhone(e.target.value); phoneTest(e.target.value)}} type="number" id="phoneNumber" required placeholder="PhoneNumber" />(숫자만 입력해 주세요){phoneValidity}<br/>
              <button type="submit">Sign up</button>
            </form>
            { authError ? <p>{authError}</p> : ''}
        </div>
    )
}