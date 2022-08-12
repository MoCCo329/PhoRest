import { useSelector, useDispatch } from 'react-redux/es/exports'

import { setViewType } from '../../store/modules/mypage'

import MyGallery from "./MyGallery"
import FollowingList from './FollowingList'

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined"
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined"
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded"
import './ActivityTabs.css'


export default function ActivityTabs(props) {
  const dispatch = useDispatch()

  const viewType = useSelector(state => state.viewType)

  const menus = {
    0: <MyGallery category='photogroup' />,
    1: <MyGallery category='frame' />,
    2: <MyGallery category='bookmark' />,
    3: <FollowingList />,
  }


  return (
    <div>
      <div className='icon-container'>
        <CameraAltOutlinedIcon style={{borderBottom: viewType===0 ? "3px solid" : ''}} fontSize="xlarge" className="mypage-icon" onClick={() => dispatch(setViewType(0))} />
        <CropFreeOutlinedIcon style={{borderBottom: viewType===1 ? "3px solid" : ''}} fontSize="xlarge" className="mypage-icon" onClick={() => dispatch(setViewType(1))} />
        <StarBorderRoundedIcon style={{borderBottom: viewType===2 ? "3px solid" : ''}} fontSize="xlarge" className="mypage-icon" onClick={() => dispatch(setViewType(2))} />
      </div>
      
      <div>
        { menus[viewType] }
      </div>
    </div>
  )
}