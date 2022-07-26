import { useState } from 'react'
import members from './../api/members'

export default function Main() {
    let [nickname, setNickname] = useState('')
    let [id, setId] = useState('')
    let [password, setPassword] = useState('')
    let [phone, setPhone] = useState('')
    let [passwordValidity, setPasswordValidity] = useState('')

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
        </div>
    )
}