import Profile from './'


export default function Community() {
    return (
        // props 게시판 종류가 네컷이면 포즈가 있어야하며
        // 프레임이면 글표시랑 프레임 편집 링크

        <div>
            <p className="community-title">{} 게시판</p>
            <div className="community">
                <div className="community-header"> {/* 상단에 도착하면 고정 */}
                    <Profile />
                    <Like />
                    <Bookmark />
                    <CommentsEdit />
                </div>
                <div className="community-body">
                    <img />
                    { communityType === "frame" ? <Contents/> : null }
                </div>
                <div>
                    <Comments />
                </div>
            </div>
        </div>
    )
}