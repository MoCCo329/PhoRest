// 로그아웃은 컴포넌트가 아니라 그냥 함수임

import members from './../api/members'

const logout = () => {
  members.logout()
  .then((result) => {
    // redux에 ''저장
    // localStorage에 token이 있으면 ''으로
    // redirect
  })
}