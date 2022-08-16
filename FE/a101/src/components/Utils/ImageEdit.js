import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

import s3 from '../../api/s3'
import mypage from '../../api/mypage'
import ModalBasic from '../Utils/ModalBasic'
import defaultProfile from '../../assets/defaultProfile.png'

// icon
import back from '../../assets/UI/back.png'

export default function ImageEdit() {
  const navigate = useNavigate()

  const [frameURL, setFrameURL] = useState('')
  const [content, setContent] = useState('')
  const [clickWell, setClickWell] = useState(false)

  const currentUser = useSelector(state => state.currentUser)

  // 모달용 변수 - basic
  const [showBasic, setShowBasic] = useState(false)
  let msg = ''
  const [message, setMessage] = useState('')
  // 모달용 함수 - basic
  const handleCloseBasic = () => setShowBasic(false)
  const setModalBasic = (msg) => {
      setShowBasic((showBasic) => {
          return !showBasic
      })
      setMessage(msg)
  }

  useEffect(() => {
    let btn = document.getElementsByClassName('sc-lxwit0-2 dfflPR sc-m9ezm7-1 fFhGIW FIE_topbar-save-button SfxButton-root')[0]  // fFhGIW 로컬 , kjdjJl 배포
    try {
      btn.style.visibility = "hidden"
    } catch {
      btn = document.getElementsByClassName('sc-lxwit0-2 dfflPR sc-m9ezm7-1 kjdjJl FIE_topbar-save-button SfxButton-root')[0]
      btn.style.visibility = "hidden"
    }
  }, [])

  const dataURLtoFile = (dataurl) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n)
    while(n--){
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${new Date().getTime()}.png`, {type:mime})
  }

  const reader = new FileReader()
  const changeImageURL = (e) => {
      if (e.target.files && e.target.files.length > 0) {
          reader.readAsDataURL(e.target.files[0])
          reader.addEventListener('load', () => {
              setFrameURL(reader.result)
          })
      }
  }

  const onBeforeSave = () => {
    if (clickWell) {
      setTimeout(() => {
        const saveBtn = document.getElementsByClassName('sc-lxwit0-2 dfflPR SfxButton-root')[1]
        saveBtn.click()
      }, 1)
    } else {
      setTimeout(() => {
        const cancelBtn = document.getElementsByClassName('sc-lxwit0-2 hdUQyw SfxButton-root')[6]
        cancelBtn.click()
      }, 1)
    }
  }

  const onSave = (editedImageObject, designState) => {
    if (!document.querySelector('#frame').files[0]) {
      msg = '이미지를 확인해주세요'
      setModalBasic(msg)
      return
    }
    const imgFile = dataURLtoFile(editedImageObject.imageBase64)
    let formdata = new FormData()
    formdata.append('content', content)
    formdata.append('image', imgFile)

    s3.uploadFrame(formdata)
    .then(result => {
      if (result.data) {
        mypage.ownPost(result.data)
      }
      navigate(`/community/${btoa((result.data) * 73 + 37)}`)
    })
  }

  const clickComplete = () => {
    setClickWell(true)
    setTimeout(() => {
      let btn = document.getElementsByClassName('sc-lxwit0-2 dfflPR sc-m9ezm7-1 fFhGIW FIE_topbar-save-button SfxButton-root')[0]  // fFhGIW 로컬 , kjdjJl 배포
      try {
        btn.click()
      } catch {
        btn = document.getElementsByClassName('sc-lxwit0-2 dfflPR sc-m9ezm7-1 kjdjJl FIE_topbar-save-button SfxButton-root')[0]
        btn.click()
      }
      setClickWell(false)
    }, 1)
  }

  const changeContent = (e) => {
    const copy = e.target.value.slice(0, 255)
    e.target.value = copy
    setContent(copy)
  }

  
  return (
    <div className='frame-edit-content'>
       <p className='notice-frame'>✅ 권장되는 프레임의 사이즈는 가로: 1500px 세로: 1000px 입니다</p>
      {(
        <FilerobotImageEditor
          source={frameURL || defaultProfile}
          onSave={onSave}
          onBeforeSave={onBeforeSave}
          annotationsCommon={{
            fill: '#000000',
          }}
          Text={{ text: 'PhoRest' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          defaultSavedImageName={`${new Date().getTime()}.png`}
          Crop={{
            presetsItems: [
              {
                titleKey: 'PhoRest Frame',
                descriptionKey: '3:2',
                ratio: 3 / 2,
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
              },
            ],
          }}
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
          />
          )}
          <br></br>
      <form>
        <div>
          <label htmlFor="frame">이미지 업로드</label>
          <input name="frame" onChange={(e) => changeImageURL(e)} type="file" accept="image/*" id="frame" />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }} >
            <label htmlFor="content">글 내용</label>
            <div>{`${content.length} / 255`}</div>
          </div>
          <input name="content" onChange={(e) => changeContent(e)} type="text" id="content" defaultValue={content} />
        </div>

        <button onClick={clickComplete}>게시글 등록</button>
      </form>
      <div className='back-motion'>
        <div className='back-motion-btn' onClick={() => navigate(-1)}><img className='icon-img' src={back} alt='back'></img><div>뒤로가기</div></div>
      </div>
      <ModalBasic
          show={showBasic}
          onHide={handleCloseBasic}
          text={message}
        />  
    </div>
  )
}