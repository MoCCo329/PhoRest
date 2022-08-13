import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import Search from "./Search"

import user from "../../api/user"
import { setIsFollowing } from "../../store/modules/mypage"
import { setViewType } from "../../store/modules/mypage"

import Modal from "react-bootstrap/Modal"

import "./MypageProfile.css"
import defaultProfile from "../../assets/defaultProfile.png"


export default function MypageProfile(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isMyMypage, setIsMyMypage] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const userDetail = useSelector(state => state.userDetail)
  const currentUser = useSelector(state => state.currentUser)

  useEffect(() => {
    if (userDetail.username===currentUser.username) {
      setIsMyMypage(true)
    } else {
      setIsMyMypage(false)
    }
  }, [userDetail, currentUser])

  // 로그인 안되어있는채로 팔로우버튼을 누르면 로그인창으로 안내하는 모달창 나옴
  const [show, setShow] = useState(false)
  // 모달
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
              <button variant="primary" onClick={handleShow}>
              팔로우하기
            </button>
            )}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={true}
              className="modal"
            >
              <Modal.Body>
                로그인이 필요한 기능입니다.
                <br></br>
                로그인 하시겠습니까?
              </Modal.Body>
              <Modal.Footer>
                <button variant="secondary" onClick={handleClose}>
                  다음에 할게요
                </button>
                <button variant="primary" onClick={() => navigate("/login")}>
                  로그인 할래요
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="search-button">
            <button onClick={() => setIsSearching(!isSearching)} >유저 검색</button>
            {
              isSearching ?
              <Search setIsSearching={setIsSearching}></Search> :
              null
            }
          </div>
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
    </div>
  )
}