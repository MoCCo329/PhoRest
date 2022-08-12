import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Profile from '../User/Profile'

import user from './../../api/user'

export default function FollowerList() {  
  const [followerList, setFollowerList] = useState('')
  const userDetail = useSelector(state => state.userDetail)

  useEffect(() => {
    user.followerList({ username : userDetail.username })
    .then(result => {
      setFollowerList(result.data)
    })
  }, [])


  return (
    <div className='follow-container'>
        {
          followerList && followerList.length ?
          followerList.map(user => <div key={user.username}><Profile user={user} /></div>) :
          <p>팔로워가 없습니다</p>
        }
    </div>
  )
}