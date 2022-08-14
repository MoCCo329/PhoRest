import Layout from '../components/Layout/Layout'
import ActivityTabs from "../components/MyPage/ActivityTabs"
import MypageProfile from "../components/MyPage/MypageProfile"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"

import mypage from "../api/mypage"
import { setUserDetail } from "../store/modules/mypage"

export default function MyPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { username } = useParams()

  useMemo(() => {
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
        <MypageProfile></MypageProfile>
        <hr />
        <ActivityTabs></ActivityTabs>
    </Layout>
  )
}