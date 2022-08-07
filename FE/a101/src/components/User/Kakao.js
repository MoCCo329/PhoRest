import React from 'react'
// import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Kakao() {
    // const dispatch = useDispatch()
    const navigate = useNavigate()

    const href = window.location.href
    let params = new URL(window.location.href).searchParams;
    let code = params.get('code');

    console.log(code)

    //토큰 저장
    const getKakaoToken = () => {
        fetch(`https://phorest.site/api/user/kakao/signup?code=${code}`, {
            method: 'get',
        })
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('token', data.access_token)
                navigate('/')
            } else {
                navigate('/')
            }
        })
    }

    useEffect(() => {
        // if (!code) return;
        getKakaoToken();
    }, []);

    return (
        <div>
            미들웨어입니다
        </div>
    )
}