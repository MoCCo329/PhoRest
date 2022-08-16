import './MypageProfile.css'

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Search from "./Search"

import user from "../../api/user"
import { setIsFollowing } from "../../store/modules/mypage"
import { setViewType } from "../../store/modules/mypage"

import ModalConfirm from '../Utils/ModalConfirm'
import defaultProfile from "../../assets/defaultProfile.png"


export default function MypageProfile(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchBox = useRef('')
  const [isMyMypage, setIsMyMypage] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const userDetail = useSelector(state => state.userDetail)
  const currentUser = useSelector(state => state.currentUser)

  // 로그인 안되어있는채로 팔로우버튼을 누르면 로그인창으로 안내하는 모달창 나옴
  // 모달용 변수
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  let msg = '로그인이 팔로우 가능합니다. 로그인 하시겠습니까?'
  let todo = '로그인'
  // 모달용 함수
  const setModal = () => {
      setShow((show) => {
          return !show
      })
  }

  useEffect(() => {
    if (userDetail.username===currentUser.username) {
      setIsMyMypage(true)
    } else {
      setIsMyMypage(false)
    }
  }, [userDetail, currentUser])

  const handleSearchBox = (e) => {
    if (searchBox.current && !searchBox.current.contains(e.target)) {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handleSearchBox)
    return (() => {window.removeEventListener('click', handleSearchBox)})
  }, [])


  // 팔로우 버튼 누르면 신청 / 다시 누르면 언팔
  function follow() {
    user.follow(userDetail.username)
    .then((result) => {
      dispatch(setIsFollowing(result.data))
    })
  }

  return (
    <div>
      <div className="profile-box">
        <div className="profile-state">
          <img
            className="profile-img"
            src={userDetail.profileURL || defaultProfile}
            alt="profileImage"
          />
        </div>
        
        <div className="list-container">
          <div className="info" onClick={() => dispatch(setViewType(0))}>
            <div className="num">
              {
              userDetail && userDetail.username ?
              userDetail.postDTOS.filter(item => item.category === "photogroup").length :
              0
              }
            </div>
            <div className="name">게시글</div>
          </div>

          <div className="info" onClick={() => dispatch(setViewType(1))}>
            <div className="num">
              {
              userDetail && userDetail.username ?
              userDetail.postDTOS.filter(item => item.category === "frame").length :
              0
              }
            </div>
            <div className="name">프레임</div>
          </div>

          <div className="info" onClick={() => dispatch(setViewType(4))}>
            <div className="num">
              {userDetail && userDetail.username ? userDetail.followerCount : null}
            </div>
            <div className="name">팔로워</div>
          </div>

          {
            isMyMypage ?
            <div className="info" onClick={() => dispatch(setViewType(3))}>
              <div className="num">
                {userDetail.followingCount}
              </div>
              <div className="name">팔로우</div>
            </div> :
            null
          }
        </div>
      </div>

      <div className="profile-introduce">{userDetail.introduce}</div>

      {isMyMypage && (
        <div className="modal-button">
          <button onClick={() => navigate("/mypage/edit")}>
            회원정보 수정하기
          </button>
        </div>
      )}

      <div className="modal-button">
        {currentUser && currentUser.username ? (
          !isMyMypage ? (userDetail.following ? (
            <button className="button-unfollow" onClick={follow}>
              팔로우 취소하기
            </button>
          ) : (
            <button className="button-follow" onClick={follow}>
              팔로우 하기
            </button>
          )) : (null)
        ) : (
          <button variant="primary" onClick={setModal}>
          팔로우하기
          </button>
        )}
        <ModalConfirm
            show={show}
            onHide={handleClose}
            text={msg}
            action={() => navigate("/login")}
            todo={todo}
        />
      </div>
      <div className="search-button" ref={searchBox}>
        <button onClick={() => setIsSearching(!isSearching)} >유저 검색</button>
        {
          isSearching ?
          <Search setIsSearching={setIsSearching}></Search> :
          null
        }
      </div>
    </div>
  )
}