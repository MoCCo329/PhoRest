import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setToken, setAuthError } from '../store/modules/member'
import members from './../api/members'


export default function Main() {
    let [id, setId] = useState('')
    let [password, setPassword] = useState('')
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        const credentials = {
            username : id,
            password : password,
        }

        members.login(credentials)
        .then((result) => {
            const token = result.data.key
            dispatch(setToken(token))
            localStorage.setItem('token', token)
            members.currentUser()
            navigate(-1)
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
              <button type="submit">Sign up</button>
            </form>
            {/* 기억하기 버튼 => local에 저장할지 말지 */}
            {/* AUTH_ERROR redux에 있으면 보여주기 */}
        </div>
    )
}