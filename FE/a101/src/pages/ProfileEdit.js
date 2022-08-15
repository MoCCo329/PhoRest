import './ProfileEdit.css'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'
import ModalBasic from '../components/Utils/ModalBasic'

// functions
import user from '../api/user'
import s3 from '../api/s3'
import { setCurrentUser } from '../store/modules/user'

// icon
import back from '../assets/UI/back.png'

export default function ProfileEdit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
  const [isKakao, setIsKakao] = useState(false)

  const [profileURL, setProfileURL] = useState('')
  const [beforeProfileURL, setBeforeProfileURL] = useState('')
  const [phoneValidity, setPhoneValidity] = useState('')
  const [authError, setAuthError] = useState('')  // 회원정보 수정은 회원가입, 로그인 authError처럼 redux이용 X

  // 모달용 변수 - basic
  const [showBasic, setShowBasic] = useState(false)
  let msg = ''
  const [message, setMessage] = useState('')
  const [onExit, setOnExit] = useState(false)
  // 모달용 함수 - basic
  const handleCloseBasic = () => setShowBasic(false)
  const setModalBasic = (msg) => {
      setShowBasic((showBasic) => {
          return !showBasic
      })
      setMessage(msg)
  }
  const setOnExitBasic = () => {
    setOnExit((onExit) => {
        return !onExit
    })
  }

  const defaultPhone = () => {
    const phone = currentUser.phone
    if (phone) {
      if (phone.length===10) {
        return phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6)
      } else {
        return phone.slice(0, 3) + '-' + phone.slice(3, 7) + '-' + phone.slice(7)
      }
    }
    return ''
  }

  useEffect(() => {
    setProfileURL(currentUser.profileURL)
    setBeforeProfileURL(currentUser.profileURL)
    if (currentUser.kakao) {
      setIsKakao(true)
    } else {
      setIsKakao(false)
    }
  }, [currentUser])

  useEffect(() => {
    user.currentUser()
    .then(result =>
      dispatch(setCurrentUser(result.data)))
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    setAuthError('')

    if (phoneValidity) {
      msg = '핸드본번호를 정확히 입력해 주세요'
      setModalBasic(msg)
      return 
    }

    let form = document.forms.profileEdit.elements
    let credentials = {
      nickname : form.nickname.value,
      phone: form.phone.value.replace(/[^0-9a-zA-Z]/g, '') || '',
      introduce: form.introduce.value || '',
      profileURL : profileURL
    }

    user.profileEdit(credentials)
    .then((result) => {
      if (result.data===0) {
        // dispatch(setCurrentUser(''))
        user.currentUser()
        .then(result => {
          dispatch(setCurrentUser(result.data))
          msg = '회원정보가 변경되었습니다.'
          setOnExitBasic()
          setModalBasic(msg)
        })
        return
        // msg = '회원정보가 변경되었습니다.'
        // setModalBasic(msg)
        // return
      } else if (result.data===1) {
        setAuthError('잘못된 접근입니다. (로그인 되어있지 않음)')
      } else if (result.data===2) {
        setAuthError('중복된 핸드폰번호가 존재합니다.')
      }
    })
    .catch((error) => {
      if (error.response.data.message==='@Valid Error') {
        let errorMessage = `${error.response.data.fieldErrors[0].field} : ${error.response.data.fieldErrors[0].defaultMessage}`
        setAuthError(errorMessage)
      } else {
        setAuthError(error.response.data.message)
      }
    })
  }

  const changeImageURL = (e) => {
    let beforeFormdata = new FormData()
    beforeFormdata.append('image', beforeProfileURL)
    if (beforeProfileURL) {
      s3.deleteProfileURL(beforeFormdata)
    }    
    setBeforeProfileURL(profileURL)

    let formdata = new FormData()
    formdata.append('image', e.target.files[0])
    s3.profileURL(formdata)
    .then(result => {
      setProfileURL(result.data)
    })
  }

  const deleteImage = () => {
    document.querySelector('#profileURL').value = ''
    setProfileURL('')
  }

  const phoneFilter = (e) => {
    const { value } = e.target
    let filtered = value.replace(/[^0-9]/g, '')

    if (filtered.length===3) {
      filtered = filtered.slice(0, 3)
    } else if (filtered.length >= 3 && filtered.length <= 6) {
      filtered = filtered.slice(0, 3) + '-' + filtered.slice(3)
    } else if (filtered.length > 6 && filtered.length <= 10) {
      filtered = filtered.slice(0, 3) + '-' + filtered.slice(3, 6) + '-' + filtered.slice(6)
    } else if (filtered.length >= 11) {
      filtered = filtered.slice(0, 3) + '-' + filtered.slice(3, 7) + '-' + filtered.slice(7)
    }
    e.target.value = filtered
    if (e.target.value.length === 12 || e.target.value.length === 13) {
      setPhoneValidity('')
    } else {
      setPhoneValidity('핸드폰번호는 10자 혹은 11자이여야 합니다')
    }
  }


  return (
    <Layout>
      <main>
        <div className='profile-edit-content'>
          <div className="login-header">
            <h5>회원정보 수정하기</h5>
          </div>

          <div className='form'>
            { profileURL ? <img id='new-profile-img' src={ profileURL } alt="profileImg"></img> : null }
            {
              profileURL ? <button onClick={() => deleteImage()}>지우기</button> : null
            }
            <div>
              <label htmlFor="profileURL">Profile Image</label>
              <input name="profileURL" onChange={(e) => changeImageURL(e)} type="file" accept="image/*" id="profileURL" />
            </div>
          </div>

          <form name="profileEdit" onSubmit={(e) => {onSubmit(e)}}>
            <div>
              <label htmlFor="Nickname">Nickname</label>
              <input name="nickname" type="text" id="Nickname" defaultValue={ currentUser.nickname || '' } required placeholder="Nickname" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <input name="phone" onChange={(e) => phoneFilter(e)} type="text" id="phone" defaultValue={ defaultPhone() || '' } required={ isKakao ? false : true } placeholder="phone" />
              <div>(01로 시작하는 숫자만 입력해 주세요)</div>
              <div>{phoneValidity}</div>
            </div>
            
            <div>
              <label htmlFor="introduce">Introduce</label>
              <textarea name="introduce" type="text" id="introduce" defaultValue={ currentUser.introduce || '' } placeholder="소개글을 적어주세요" />
            </div>

            <button type="submit">수정하기</button>
            { authError ? <p>{ authError }</p> : '' }
          </form>
          <div className='hr-sect'>
            또는
          </div>
          <div className='profile-edit-btn-group'>
            {
              !isKakao ?
                <button id='change-pw-btn' onClick={() => navigate('/mypage/editpw')}>비밀번호 변경하기</button>
              :
              null
            }
            
          </div>
          <button id='membership-withdrawal' onClick={() => navigate('/mypage/delete')}>탈퇴하기</button>
          <div className='back-motion'>
            <div className='back-motion-btn' onClick={() => navigate(-1)}><img className='icon-img' src={back} alt='back'></img><div>뒤로가기</div></div>
          </div>
          <ModalBasic
          show={showBasic}
          onHide={handleCloseBasic}
          text={message}
          onExit={onExit ? () => {navigate(`/mypage/${currentUser.username}`)} : null}
        />   
        </div>
      </main>
    </Layout>
  )
}