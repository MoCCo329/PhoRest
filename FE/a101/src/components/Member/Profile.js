import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

export default function Profile(props) {
    const navigate = useNavigate()

    return (
        <div onClick={() => {navigate(`/mypage/${props.username}`)}}>
           <AccountCircleTwoToneIcon className="header-profile" />
        </div>
    )
  }