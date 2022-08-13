import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

import s3 from '../../api/s3'
import mypage from '../../api/mypage'

import defaultProfile from '../../assets/defaultProfile.png'

export default function ImageEdit() {
  const navigate = useNavigate()

  const [frameURL, setFrameURL] = useState('')
  const [content, setContent] = useState('')
  const [clickWell, setClickWell] = useState(false)

  useEffect(() => {
    const btn = document.getElementsByClassName('sc-lxwit0-2 dfflPR sc-m9ezm7-1 fFhGIW FIE_topbar-save-button SfxButton-root')[0]
    btn.style.visibility = "hidden"
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
    return new File([u8arr], `PhoRest_${new Date().getYear()}-${new Date().getMonth()}-${new Date().getDate()}.png`, {type:mime})
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
      return alert('이미지를 확인해주세요')
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
      const btn = document.getElementsByClassName('sc-lxwit0-2 dfflPR sc-m9ezm7-1 fFhGIW FIE_topbar-save-button SfxButton-root')[0]
      btn.click()
      setClickWell(false)
    }, 1)
  }

  return (
    <div>
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
          defaultSavedImageName={`PhoRest_${new Date().getYear()}-${new Date().getMonth()}-${new Date().getDate()}`}
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
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
        />
      )}

      <label htmlFor="frame">이미지 업로드 : </label>
      <input name="frame" onChange={(e) => changeImageURL(e)} type="file" accept="image/*" id="frame" />

      <label htmlFor="content">글 내용 : </label>
      <input name="content" onChange={(e) => setContent(e.target.value)} type="text" id="content" defaultValue={content} />

      <button onClick={clickComplete}>게시글 등록</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  )
}