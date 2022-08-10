import { useState } from "react"

import user from './../../api/user'

import Profile from './../User/Profile'

export default function Search () {
  const [input, setInput] = useState('')
  const [result, setResult] = useState()

  const search = (input) => {
    user.search(input)
    .then(result => {
      setResult(result.data)
    })
  }

  return (
    <div>
      <input type="text" onChange={(e) => search(e.target.value)} placeholder="찾고싶은 유저명을 검색해주세요"/>
      {
        result && result.length ?
        result.map(user => {
          return <><Profile user={ user } key={ user.username }></Profile>{user.nickname}</>  // position absolute같은거 해야할듯
        }) :
        null
      }
    </div>
  )
}