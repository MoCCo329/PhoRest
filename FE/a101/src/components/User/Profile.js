import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Profile.css'

// default profile
import defaultProfile from '../../assets/defaultProfile.png'

export default function Profile(props) {
    const navigate = useNavigate()
    
    const [user, setUser] = useState(props.user)

    return (
        <div className="profile" onClick={() => {navigate(`/mypage/${user.username}`)}}>
           {
            user.profileURL ? <img className="profile-header" src={user.profileURL} alt="" /> : <img className="profile-header" src={defaultProfile} alt='default profile'/>
           }
           <div className='profile-nickname'>{user.nickname}</div>
        </div>
    )
  }