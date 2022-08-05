import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import { setCurrentUser } from '../store/modules/user'

// functions
import user from '../api/user'
import s3 from '../api/s3'


export default function ProfileEdit() {
  const navigate = useNavigate()

  const userDetail = useSelector(state => state.currentUser)

  const [type, setType] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [passwordValidity, setPasswordValidity] = useState('')
  const [phoneValidity, setPhoneValidity] = useState('')
  const [profileURL, setProfileURL] = useState('1')

  const [authError, setAuthError] = useState('')  // 회원정보 수정은 회원가입, 로그인 authError처럼 redux이용 X

  useEffect(() => {
    setProfileURL(userDetail.profileURL)
  }, [userDetail])

  const onSubmit = (event) => {
    event.preventDefault()
    setAuthError('')
    if (phoneValidity==="Phone number should have length of 11") {
      return alert('핸드본번호를 정확히 입력해 주세요')
    }

    if (passwordValidity==="Passwords match" || type===false) {

      let form = document.forms.profileEdit.elements

      const credentials = {
        username : userDetail.username,
        nickname : form.nickname.value,
        beforePassword : form.beforePassword.value,
        password : newPassword,
        phone : form.phone.value,
        profileURL : profileURL,
        introduce: form.introduce.value
      }

      if (!type) {
        credentials.password = form.beforePassword.value
      }

      user.profileEdit(credentials)
      .then((result) => {
        if (result.data===0) {
          user.currentUser()
          alert('회원정보가 변경되었습니다.')
          navigate(`/mypage/${userDetail.username}`)
        } else if (result.data===1) {
          setAuthError('잘못된 접근입니다. (로그인 되어있지 않음)')
        } else if (result.data===2) {
          setAuthError('비밀번호가 틀립니다.')
        } else if (result.data===3) {
          setAuthError('사용불가능한 닉네임입니다.')
        } else if (result.data===4) {
          setAuthError('중복된 핸드폰번호가 존재합니다.')
        }
      })
    } else {
        alert('비밀번호가 잘못되었습니다')
    }
  }

  const passwordTest = (value) => {
    if (value === '') {
      setPasswordValidity('')
    } else if (value !== newPassword) {
      setPasswordValidity('Passwords do not match')
    } else if (value.length < 3) {
      setPasswordValidity('Password length should be 3 or more')
    } else {
      setPasswordValidity('Passwords match')
    }
  }
  
  const phoneTest = (value) => {
    if (value.length === 11 || value.length === 0) {
      setPhoneValidity('')
    } else {
      setPhoneValidity('Phone number should have length of 11')
    }
  }

  const changeImageURL = (e) => {
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

  return (
    <div>
      { profileURL ? <img src={ profileURL } alt="profileImg"></img> : null }
      {
        profileURL ? <button onClick={() => deleteImage()}>지우기</button> : null
      }
      <label htmlFor="profileURL">Profile Image : </label>
      <input name="profileURL" onChange={(e) => changeImageURL(e)} type="file" accept="image/*" id="profileURL" />
      <br/>

      <form name="profileEdit" onSubmit={(e) => {onSubmit(e)}}>
        <label htmlFor="Nickname">Nickname : </label>
        <input name="nickname" type="text" id="Nickname" defaultValue={ userDetail.nickname || '' } required placeholder="Nickname" /><br/>
        
        <button onClick={(e) => {e.preventDefault(); setType(!type)}}>{ type ? "비밀번호 변경하지 않기" : "비밀번호 변경" }</button><br />
        {
          type ?
          <div>
            <label htmlFor="password">New Password : </label>
            <input name="Password" onChange={(e) => {setNewPassword(e.target.value)}} type="password" id="password" required placeholder="New Password" /><br/>
            <label htmlFor="password2">New Password Again : </label>
            <input name="password2" onChange={(e) => {passwordTest(e.target.value)}} type="password" id="password2" required placeholder="New Password Again" /> {passwordValidity}<br/>
          </div> : null
        }
        
        <label htmlFor="phone">Phone : </label>
        <input name="phone" onChange={(e) => phoneTest(e.target.value)} type="number" id="phone" defaultValue={ userDetail.phone || '' } required placeholder="phone" />(숫자만 입력해 주세요){phoneValidity}<br/>

        <label htmlFor="introduce">Introduce : </label>
        <input name="introduce" type="text" id="introduce" defaultValue={ userDetail.introduce || '' } placeholder="Introduce" /><br/>

        기존 비밀번호 입력
        <label htmlFor="beforePassword">Password : </label>
        <input name="beforePassword" type="password" id="beforePassword" required placeholder="Password" /><br/>

        <button type="submit">Edit</button>
        { authError ? <p>{ authError }</p> : '' }
      </form>
    </div>
  )
}