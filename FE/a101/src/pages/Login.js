import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setToken, setAuthError } from '../store/modules/member'
import member from '../api/member'


export default function Main() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [id, setId] = useState('')
    let [password, setPassword] = useState('')
    let authError = useSelector(state => state.authError)

    console.log(authError)
    useEffect(() => {
        return () => {dispatch(setAuthError(''))}
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        // dispatch(setAuthError(''))
        const credentials = {
            username : id,
            password : password
        }
        member.login(credentials)
        .then((result) => {
            const token = result.data.token
            dispatch(setToken(token))
            localStorage.setItem('token', token)
            // member.currentUser()
            navigate(-1)
        })
        .catch((error) => {
            dispatch(setAuthError(error.response.data.message))
            console.error(error)
        })
    }

    return (
        <div>
            <form onSubmit={(e) => {onSubmit(e, dispatch, navigate, setToken, setAuthError)}}>
              <label htmlFor="username">ID : </label>
              <input onChange={(e)=>{setId(e.target.value)}} type="text" id="username" required placeholder="ID" /><br/>
              <label htmlFor="password">Password : </label>
              <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" required placeholder="Password" /><br/>
              <button type="submit">login</button>
            </form>
            {/* 기억하기 버튼 => local에 저장할지 말지 => 패스워드 암호화기술 필요함 ㅠ */}
            { authError ? <p>{authError}</p> : ''}
        </div>
    )
}