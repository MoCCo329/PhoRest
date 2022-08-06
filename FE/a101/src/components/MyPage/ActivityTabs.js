import * as React from "react";
import MyPhotos from "./MyPhotos";
import MyGallery from "./MyGallery";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

export default function ActivityTabs(props) {
  //메뉴버튼
  const [viewMenu, setViewMenu] = React.useState(0);
  const menus = {
    0: <MyGallery photos={props.photos}/>,
    1: <MyPhotos />,
    2: <MyPhotos />,
  };

  

  return (
    <div>
      {props.photos}
      <button onClick={() => setViewMenu(0)}>
        <CameraAltOutlinedIcon />
      </button>
      <button onClick={() => setViewMenu(1)}>
        <CropFreeOutlinedIcon />
      </button>
      <button onClick={() => setViewMenu(2)}>
        <StarBorderRoundedIcon />
      </button>
      <div>
        {viewMenu + "\n"}
        {props.username + "의 공개된 목록입니다"}
        {menus[viewMenu]}
      </div>
    </div>
  );
}
