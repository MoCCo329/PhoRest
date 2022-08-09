import { useSelector, useDispatch } from 'react-redux/es/exports'

import { setViewType } from '../../store/modules/mypage'

import MyGallery from "./MyGallery"
import FollowingList from './FollowingList'

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined"
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined"
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded"


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
      { props.photos || null }
      <CameraAltOutlinedIcon onClick={() => dispatch(setViewType(0))} />
      <CropFreeOutlinedIcon onClick={() => dispatch(setViewType(1))} />
      <StarBorderRoundedIcon onClick={() => dispatch(setViewType(2))} />

      <div>
        { menus[viewType] }
      </div>
    </div>
  )
}