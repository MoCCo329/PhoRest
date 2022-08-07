import * as React from "react";

import MyPhotos from "./MyPhotos";
import ScrollCalendar from "../ScrollCalendar/ScrollCalendar";

export default function MyGallery(props) {
  //버튼 누르면 볼 수 있는 방식(갤러리형태, 달력형태)이 바뀜
  const [viewGallery, setViewGallery] = React.useState(true);

  return (
    <div>
      <button onClick={() => setViewGallery(true)}>갤러리</button>
      <button onClick={() => setViewGallery(false)}>달력</button>
      <div className="view-wrapper">
        {viewGallery ? <MyPhotos photos={props.photos}/> : <ScrollCalendar photos={props.photos}/>}
      </div>
    </div>
  );
}
