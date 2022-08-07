import { useState } from 'react'
import MyGallery from "./MyGallery"
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined"
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined"
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded"

export default function ActivityTabs(props) {
  const [viewMenu, setViewMenu] = useState(0)
  const menus = {
    0: <MyGallery category='photogroup' />,
    1: <MyGallery category='frame' />,
    2: <MyGallery category='bookmark' />,
  }

  // 포토가 postDTOS

  return (
    <div>
      { props.photos || null }
      <CameraAltOutlinedIcon onClick={() => setViewMenu(0)} />
      <CropFreeOutlinedIcon onClick={() => setViewMenu(1)} />
      <StarBorderRoundedIcon onClick={() => setViewMenu(2)} />

      <div>
        { menus[viewMenu] }
      </div>
    </div>
  );
}
