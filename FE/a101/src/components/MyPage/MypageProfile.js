import "./MypageProfile.css";

export default function MypageProfile(props) {
  
  return (
    <div>
      <div className="profile-box">
        <img className="profile-img" src={props.profileUrl} alt="프로필" />
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
      <div className="memo">{props.introduce}</div>
      <button>프로필 수정하기</button>
      <button>팔로우하기</button>
    </div>
  );
}
