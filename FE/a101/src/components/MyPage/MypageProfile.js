import "./MypageProfile.css";
import defaultProfile from "../../assets/defaultProfile.png";

import { useSelector } from "react-redux";

export default function MypageProfile(props) {
  // 프로필 이미지 없을 때 대체 이미지 나오게 하는 함수
  const handleImgError = (e) => {
    e.target.src =defaultProfile;
  };
  // 데이터 가져오기
  const userDetail = useSelector(state => state.userDetail)

  // 숫자 세기
  let picCnt = userDetail.postDTOS.filter(item => item.category === "photogroup").length;
  let frameCnt = userDetail.postDTOS.filter(item => item.category === "frame").length;

  // 팔로우 버튼 누르면 신청
  let isFollow = userDetail.following

  return (
    <div>
      <div className="profile-box">
        <img
          className="profile-img"
          src={props.profileUrl}
          alt="프로필"
          onError={handleImgError}
        />
        <div className="info">
          <div className="num">{picCnt}</div>
          <div className="name">게시글</div>
        </div>
        <div className="info">
          <div className="num">{frameCnt}</div>
          <div className="name">프레임</div>
        </div>
        <div className="info">
          <div className="num">{userDetail.followerCount}</div>
          <div className="name">팔로워</div>
        </div>
      </div>
      <div className="memo">{userDetail.introduce}</div>
      <button>프로필 수정하기</button>
      <button disabled={userDetail.following}>팔로우하기</button>
    </div>
  );
}
