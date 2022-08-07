import kakaoLogin from "./login";


export default function KakaoLogin() {
    function signup() {
        kakaoLogin.then((result) => {
            console.log(result.data)
        })
    }
        

    return (
        <div>
            <button onClick={signup}>카카오 회원가입하기</button>
        </div>
    )
}