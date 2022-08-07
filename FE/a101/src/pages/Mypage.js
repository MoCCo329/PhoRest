import ActivityTabs from "../components/MyPage/ActivityTabs";
import LayoutMypage from "../components/MyPage/LayoutMypage";
import MypageProfile from "../components/MyPage/MypageProfile";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import mypage from "../api/mypage";
import { setUserDetail } from "../store/modules/mypage";

export default function MyPage() {
  const { username } = useParams();

  //마이페이지 데이터 가져오는 부분
  const dispatch = useDispatch();

  const [profile, setProfile] = useState([]);
  const userDetail = useSelector((state) => state.userDetail);

  useEffect(() => {
    setProfile(userDetail);
  }, [userDetail]);

  useEffect(() => {
    mypage
      .userDetail(username)
      .catch((err) => {
        console.log(err);
      })
      .then((result) => {
        console.log(result.data);
        dispatch(setUserDetail(result.data));
      });
  }, []);

  return (
    <LayoutMypage nickname={profile.nickname}>
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
