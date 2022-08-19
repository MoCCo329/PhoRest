import './MyPage.css'

import Layout from '../components/Layout/Layout'
import ActivityTabs from "../components/MyPage/ActivityTabs"
import MypageProfile from "../components/MyPage/MypageProfile"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

import mypage from "../api/mypage"
import { setUserDetail } from "../store/modules/mypage"

export default function MyPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { username } = useParams()
  
  useEffect(() => {
    mypage
      .userDetail(username)
      .then((result) => {
        if (!result.data || !result.data.username) {
          return navigate('/')
        }
        dispatch(setUserDetail(result.data))
      })
  }, [username])

  useEffect(() => {
    dispatch(setUserDetail(''))
  }, [])
  

  return (
    <Layout mypage={true}>
      <div className='mypage-content'>
        <MypageProfile></MypageProfile>
        <hr />
        <ActivityTabs></ActivityTabs>
      </div>
    </Layout>
  )
}