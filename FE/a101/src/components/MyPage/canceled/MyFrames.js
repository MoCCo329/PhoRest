import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

import "./MyPhotos.css"

export default function MyPhotos() {
  const navigate = useNavigate()

  const userDetail = useSelector(state => state.userDetail)
 
  return (
    <div>
      {
      userDetail &&
      userDetail.postDTOS.filter(post => post.category==="frame")===0 &&
      <p>등록된 게시물이 없습니다</p>
      }

      <div className="container-gallery">
        { userDetail &&
          userDetail.postDTOS.filter(post => post.category === "frame")
          .map((post, idx) => (
            <div className="img-board" key={ idx } onClick={() => {navigate(`/community/${btoa((post.id) * 73 + 37)}`)}}>
              <img className="post-image" src={ post.url } alt='post' />
            </div>
          ))
        }
      </div>
    </div>
  );
}
