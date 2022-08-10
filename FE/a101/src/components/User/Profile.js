import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setViewType } from '../../store/modules/mypage'

import './Profile.css'
import defaultProfile from '../../assets/defaultProfile.png'

export default function Profile(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [user, setUser] = useState(props.user)


    return (
        <div className="profile" onClick={() => {dispatch(setViewType(0)); navigate(`/mypage/${user.username}`)}}>
           {
            user.profileURL ? <img className="profile-header" src={user.profileURL} alt="" /> : <img className="profile-header" src={defaultProfile} alt='default profile'/>
           }
           <div className='profile-nickname'>{user.nickname}</div>
        </div>
    )
  }