import axios from "axios";

const base = '`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=4656da19556d6f608f3a297dd7c7b994&redirect_uri='
axios.defaults.withCredentials = true
export const kakao = axios.create({
    baseURL: base
})

const path = "https://phorest.site"
const kakaoLogin = {
    kakaoLogin (path) {
        return kakao({
            method: 'get',
            url: `${path}/`
        })
    }
}
export default kakaoLogin