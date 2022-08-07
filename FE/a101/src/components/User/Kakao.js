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

    //토큰 저장
    const getKakaoToken = () => {
        fetch('https://kauth.kakao.com/ouath/token', {
            method: 'post',
            headers: { 'Content-type': 'application/x-www-form-urlencoded'},
            body: `grant_type=authorization_code&client_id=4656da19556d6f608f3a297dd7c7b994&redirect_uri=https://phorest.site/kakao&code=${code}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('token', data.access_token)
            } else {
                navigate('/')
            }
        })
    }

    useEffect(() => {
        if (!code) return;
        getKakaoToken();
    }, []);

    return (
        <div>
            <Kakao/>
        </div>
    )
}