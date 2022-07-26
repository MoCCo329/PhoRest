import { useState } from 'react'
import members from './../api/members'

export default function Main() {
    let [id, setId] = useState('')
    let [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        const credentials = {
            username : id,
            password : password,
        }

        members.login(credentials)
        .then((result) => {
          const token = result.data.key
          // redux에 저장
          localStorage.setItem("token", token)
          // redirect
        })
        .catch((err) => {
          console.error(err.response.data)
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
        </div>
    )
}