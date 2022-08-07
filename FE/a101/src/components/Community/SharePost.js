import { useDispatch } from 'react-redux'

import mypage from '../../api/mypage'
import community from '../../api/community'
import { setDetailPost } from '../../store/modules/community'


export default function Comments(props) {
  const dispatch = useDispatch()
  const { isSharing } = props

  const clickSharing = () => {
    mypage.sharePost(props.postId)
    .then(result => {
      console.log(result.data)

      if (result.data===0) {
        community.detailPost(props.postId)
          .then(result => 
              dispatch(setDetailPost(result.data))
          )
      }
    })
  }

  return (
      <div>
        {
          isSharing ?
          <div style={{backgroundColor: isSharing ? '#ffc036' : ''}} onClick={() => clickSharing()}>공유중</div> :
          <div style={{backgroundColor: !isSharing ? '#ffc036' : ''}} onClick={() => clickSharing()}>비공유중</div>
        }          
      </div>
    )
  }