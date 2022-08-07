import signup from "./KakaoApi";

export default function KakaoSignup() {
//   const END_POINT = "http://localhost:3000/kakao";
//   function signup_kakao() {
//     signup.signup(END_POINT).then((result) => {
//       console.log(result.data);
//     });
//   }
  const url = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=4656da19556d6f608f3a297dd7c7b994&redirect_uri=http://localhost:3000/kakao"
  const singup_url = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=4656da19556d6f608f3a297dd7c7b994&redirect_uri=https://phorest.site/kakao'
  const login_url = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=4656da19556d6f608f3a297dd7c7b994&redirect_uri=https://phorest.site/api/user/kakao/login'

  function singup() {
    window.location.href = singup_url;
  }
  function login() {
    window.location.href = login_url;
  }
  return (
    <div>
      <button
        onClick={singup}
      >
        카카오로 회원가입하기
      </button>
      <button
        onClick={login}
      >
        카카오로 로그인하기
      </button>
    </div>
  );
}
