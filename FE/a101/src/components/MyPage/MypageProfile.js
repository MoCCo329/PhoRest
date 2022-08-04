import "./MypageProfile.css";
import profile from "./../../assets/tmp_profile.jpg";

export default function MypageProfile() {
  const memo =
    "제 이름은 똑바로 읽어도 거꾸로 읽어도 우영우입니다. \n기러기 토마토 스위스 인도인 별똥별 우영우… 역삼역?";
  return (
    <div>
      <div className="profile-box">
        <img className="profile-img" src={profile} alt="우영우" />
        <div className="info">
          <div className="num">21</div>
          <div className="name">게시글</div>
        </div>
        <div className="info">
          <div className="num">200</div>
          <div className="name">팔로워</div>
        </div>
        <div className="info">
          <div className="num">3</div>
          <div className="name">프레임</div>
        </div>
      </div>
      <div className="memo">{memo}</div>
    </div>
  );
}
