import { useEffect, useState } from 'react'
import Profile from '../User/Profile'

import user from './../../api/user'

export default function FollowingList() {  
  const [followingList, setFollowingList] = useState('')

  useEffect(() => {
    user.followingList()
    .then(result => {
      setFollowingList(result.data)
    })
  }, [])
  
  return (
    <div className='follow-container'>
        {
          followingList && followingList.length ?
          followingList.map(user => <div key={user.username}><Profile user={user} /></div>) :
          <p>팔로우중인 사람이 없습니다</p>
        }
    </div>
  )
}