import ActivityTabs from "../components/MyPage/ActivityTabs";
import LayoutMypage from "../components/MyPage/LayoutMypage";
import MypageProfile from "../components/MyPage/MypageProfile";

import { useParams } from "react-router-dom";
import mypage from "../api/mypage";
import { useState } from "react";

export default function MyPage() {
  const { username } = useParams();

  //마이페이지 데이터 가져오는 부분
  const [profile, setProfile] = useState([]);
  function fetchPublicPhotos() {
    mypage
      .photos(username)
      .then((response) => {
        return response.data;
      })
      .then((response) => {
        setProfile(response);
        console.log(response.nickname);
      });
  }

  return (
    <LayoutMypage nickname={profile.nickname}>
      <div>
        현재 페이지는 {username} 의 마이페이지 입니다.
        <button onClick={fetchPublicPhotos}>데이터 가져오기</button>
      </div>
      <main>
        <div>
          <MypageProfile
            profileUrl={profile.profileURL}
            introduce={profile.introduce}
          ></MypageProfile>
        </div>
        <div>
          <ActivityTabs
            username={username}
            photos={profile.postDtos}
          ></ActivityTabs>
        </div>
      </main>
    </LayoutMypage>
  );
}
