import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone"
import './Profile.css'

export default function Profile(props) {
    const navigate = useNavigate()
    
    const [user, setUser] = useState(props.user)
    const currentUser = useSelector(state => state.currentUser)

    return (
        <div className="profile" onClick={() => {navigate(`/mypage/${user.username}`)}}>
           {
            user.profileURL ? <img src={user.profileURL} alt="" /> : <AccountCircleTwoToneIcon className="profile-header" />
           }
           {user.nickname}
        </div>
    )
  }