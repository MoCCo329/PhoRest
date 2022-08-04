import * as React from "react";
import MyPhotos from "./MyPhotos";
import MyGallery from "./MyGallery";

import { useSelector, useDispatch } from "react-redux";
import mypage from "../../api/mypage";


export default function ActivityTabs() {
  //메뉴버튼
  const [viewMenu, setViewMenu] = React.useState(0);
  const menus = {
    0: <MyGallery/>,
    1: <MyPhotos/>,
    2: <MyPhotos/>,
  }
  
  //마이페이지 데이터 가져오는 부분
  const dispatch = useDispatch();
  const { username } = "choi";
  let content = useSelector((state) => state.pics_myapge);

  // if (!!!content.url) {
  //   mypage
  //     .pic(username)
  //     .then((result) => result.data)
  //     .then((result) => {
  //       const copy = {
  //         postId: result.id,
  //         category: result.category,
  //         url: result.url,
  //         content: result.content,
  //         humanCount: result.human_count,
  //         time: result.time,
  //       };
  //       dispatch(fetchPic(copy));
  //     });
  // }

  return (
    <div>
      <button onClick={() => setViewMenu(0)}>사진보기</button>
      <button onClick={() => setViewMenu(1)}>북마크</button>
      <button onClick={() => setViewMenu(2)}>프레임보기</button>
      <div>
        {viewMenu}
        {menus[viewMenu]}
      </div>
    </div>
  );
}
