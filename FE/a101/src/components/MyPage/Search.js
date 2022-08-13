import { useState, useEffect, useRef } from "react"

import user from './../../api/user'

import Profile from './../User/Profile'


export default function Search (props) {
  const [result, setResult] = useState('')

  const search = (input) => {
    user.search(input)
    .then(result => {
      setResult(result.data)
    })
  }  
  
  const resultBox = useRef(null)
  useEffect(() => {
    if (resultBox.current) {
      resultBox.current.scrollIntoView({ behavior: 'auto' })
    }
  }, [resultBox.current])

  
  return (
    <div className="search-box" ref={ resultBox }>
      <input type="text" onChange={(e) => search(e.target.value)} placeholder="찾고싶은 유저명을 검색해주세요" autoFocus />
      {
        result && result.length ?
        <div className="result-box">
        {result.map(user => {
          return <div key={ user.username } onClick={() => {props.setIsSearching(false)}} ><Profile user={ user } ></Profile></div>
        })}
        </div> :
        null
      }

    </div>
  )
}