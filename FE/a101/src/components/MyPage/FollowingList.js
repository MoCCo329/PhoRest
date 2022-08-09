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
    <div>
        {
          followingList ?
          followingList.map(user => <Profile user={user} key={user.username}/>) :
          null
        }
    </div>
  )
}