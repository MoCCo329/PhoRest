import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

export default function Profile(props) {
    const navigate = useNavigate()

    let user = useSelector(state => state.currentUser)
    if (props.user) {
        user = props.user
    }


    return (
        <div onClick={() => {navigate(`/mypage/${user.username}`)}}>
           {
            user.url ? <img src={user.url} alt="" /> : <AccountCircleTwoToneIcon className="header-profile" />
           }
           {user.nickname}
        </div>
    )
  }