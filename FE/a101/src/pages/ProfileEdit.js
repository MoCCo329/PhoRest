import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/Layout/Layout'

// functions
import user from '../api/user'
import s3 from '../api/s3'
import { setCurrentUser } from '../store/modules/user'


export default function ProfileEdit() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser)
  const [isKakao, setIsKakao] = useState(false)

  const [profileURL, setProfileURL] = useState('')
  const [beforeProfileURL, setBeforeProfileURL] = useState('')
  const [phoneValidity, setPhoneValidity] = useState('')
  const [authError, setAuthError] = useState('')  // 회원정보 수정은 회원가입, 로그인 authError처럼 redux이용 X

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
      return alert('핸드본번호를 정확히 입력해 주세요')
    }

    let form = document.forms.profileEdit.elements
    let credentials = {
      nickname : form.nickname.value,
      phone: form.phone.value || '',
      introduce: form.introduce.value || '',
      profileURL : profileURL
    }

    user.profileEdit(credentials)
    .then((result) => {
      if (result.data===0) {
        dispatch(setCurrentUser(''))
        user.currentUser()
        .then(result => {
          dispatch(setCurrentUser(result.data))
        })
        alert('회원정보가 변경되었습니다.')
        navigate(`/mypage/${currentUser.username}`)
      } else if (result.data===1) {
        setAuthError('잘못된 접근입니다. (로그인 되어있지 않음)')
      } else if (result.data===2) {
        setAuthError('중복된 닉네임이 존재합니다')
      } else if (result.data===3) {
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
    const filtered = value.replace(/[^0-9]/g, '')
    e.target.value = filtered
    if (e.target.value.length === 10 || e.target.value.length === 11) {
      setPhoneValidity('')
    } else {
      setPhoneValidity('핸드폰번호는 10자 혹은 11자이여야 합니다')
    }
  }


  return (
    <Layout>
      <main>
        { profileURL ? <img src={ profileURL } alt="profileImg"></img> : null }
        {
          profileURL ? <button onClick={() => deleteImage()}>지우기</button> : null
        }
        <label htmlFor="profileURL">Profile Image : </label>
        <input name="profileURL" onChange={(e) => changeImageURL(e)} type="file" accept="image/*" id="profileURL" />
        <br/>

        <form name="profileEdit" onSubmit={(e) => {onSubmit(e)}}>
          <label htmlFor="Nickname">Nickname : </label>
          <input name="nickname" type="text" id="Nickname" defaultValue={ currentUser.nickname || '' } required placeholder="Nickname" /><br/>
            
          <label htmlFor="phone">Phone : </label>
          <input name="phone" onChange={(e) => phoneFilter(e)} type="text" id="phone" defaultValue={ currentUser.phone || '' } required={ isKakao ? false : true } placeholder="phone" />(01로 시작하는 숫자만 입력해 주세요) {phoneValidity}<br/>

          <label htmlFor="introduce">Introduce : </label>
          <input name="introduce" type="text" id="introduce" defaultValue={ currentUser.introduce || '' } placeholder="Introduce" /><br/>

          <button type="submit">Edit</button>
          { authError ? <p>{ authError }</p> : '' }
        </form>

        {
          !isKakao ?
          <button onClick={() => navigate('/mypage/editpw')}>비밀번호 변경하기</button> :
          null
        }
        
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </main>
    </Layout>
  )
}