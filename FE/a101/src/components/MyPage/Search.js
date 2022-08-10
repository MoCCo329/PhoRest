import { useState } from "react"
import { useDispatch } from 'react-redux'

import user from './../../api/user'
import { setUserDetail } from './../../store/modules/community'

import Profile from './../User/Profile'


export default function Search () {
  const dispatch = useDispatch()
  const [result, setResult] = useState('')

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
          return <div key={ user.username }><Profile user={ user } ></Profile>{user.nickname}</div>  // position absolute같은거 해야할듯
        }) :
        null
      }
    </div>
  )
}