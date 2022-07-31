import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";

export default function Profile() {
    const navigate = useNavigate()

    return (
        <div onClick={() => {navigate('/mypage')}}>
           <AccountCircleTwoToneIcon className="header-profile" />
        </div>
    )
  }