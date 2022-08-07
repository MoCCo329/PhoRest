import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'

import { setToken, setAuthError, setCurrentUser } from '../store/modules/user'
import user from '../api/user'


export default function Main() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let [id, setId] = useState('')
    let [password, setPassword] = useState('')
    let authError = useSelector(state => state.authError)

    useEffect(() => {
        return () => {dispatch(setAuthError(''))}
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(setAuthError(''))
        const credentials = {
            username : id,
            password : password
        }
        user.login(credentials)
        .then((result) => {
            const token = result.data.token
            dispatch(setToken(token))
            localStorage.setItem('token', token)
            user.currentUser()
            .then(result => {
                dispatch(setCurrentUser(result.data))
            })
            navigate(-1, { replace: true })
        })
        .catch((error) => {
            dispatch(setAuthError(error.response.data.message))
            console.error(error)
        })
    }

    return (
        <Layout>
            <main>
                <form onSubmit={(e) => {onSubmit(e)}}>
                <label htmlFor="username">ID : </label>
                <input onChange={(e)=>{setId(e.target.value)}} type="text" id="username" required autoFocus placeholder="ID" /><br/>
                <label htmlFor="password">Password : </label>
                <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" required placeholder="Password" /><br/>
                <button type="submit">login</button>
                </form>
                { authError ? <p>{authError}</p> : ''}

                <button onClick={() => navigate('/signup', { replace: true })}>회원가입</button>
            </main>
        </Layout>
    )
}