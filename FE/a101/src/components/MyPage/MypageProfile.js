import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./MypageProfile.css";
import defaultProfile from "../../assets/defaultProfile.png";

export default function MypageProfile(props) {
  const navigate = useNavigate();

  const userDetail = useSelector((state) => state.userDetail);
  const currentUser = useSelector((state) => state.currentUser);
  const [isMyMypage, setIsMyMypage] = useState(false);

  useEffect(() => {
    if (userDetail.username === currentUser.username) {
      setIsMyMypage(true);
    }
  }, [userDetail, currentUser]);

  // 프로필 이미지 없을 때 대체 이미지 나오게 하는 함수
  const handleImgError = (e) => {
    e.target.src = defaultProfile;
  };

  return (
    <div>
      <div className="profile-box">
        <div className="profile-state">
          <img
            className="profile-img"
            src={userDetail.profileURL}
            alt="profileImage"
            onError={handleImgError}
          />
          <div className="profile-introduce">{userDetail.introduce}</div>
          {isMyMypage && (
            <button onClick={() => navigate("/mypage/edit")}>
              회원정보 수정하기
            </button>
          )}
          {!isMyMypage ? <button>팔로우하기</button> : null}
        </div>

        <div className="info">
          <div className="num">
            {userDetail
              ? userDetail.postDTOS.filter(
                  (item) => item.category === "photogroup"
                ).length
              : 0}
          </div>
          <div className="name">게시글</div>
        </div>

        <div className="info">
          <div className="num">
            {userDetail
              ? userDetail.postDTOS.filter((item) => item.category === "frame")
                  .length
              : 0}
          </div>
          <div className="name">프레임</div>
        </div>

        <div className="info">
          <div className="num">{userDetail.followerCount}</div>
          <div className="name">팔로워</div>
        </div>
      </div>
    </div>
  );
}
