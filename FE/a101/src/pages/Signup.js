import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import member from '../api/member'
import { setAuthError } from '../store/modules/member'

export default function Main() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [nickname, setNickname] = useState('')
    let [id, setId] = useState('')
    let [password, setPassword] = useState('')
    let [phone, setPhone] = useState('')
    let [passwordValidity, setPasswordValidity] = useState('')
    let authError = useSelector(state => state.authError)

    useEffect(() => {
        return () => {dispatch(setAuthError(''))}
    }, [])

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
        dispatch(setAuthError(''))
        if (passwordValidity==="Passwords match") {
            const credentials = {
                username : id,
                nickname : nickname,
                password : password,
                phone : phone
            }
            member.signup(credentials)
            .then((result) => {
                navigate("/login/")
            })
            .catch((error) => {
                dispatch(setAuthError(error.response.data.message))
                console.error(error.response)
            })
        } else {
            alert('비밀번호가 일치하지 않습니다')
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
              <input onChange={(e)=>{setPhone(e.target.value)}} type="number" id="phoneNumber" required placeholder="PhoneNumber" /><br/>
              <button type="submit">Sign up</button>
            </form>
            { authError ? <p>{authError}</p> : ''}
        </div>
    )
}