import * as React from "react"
import "./ScrollCalendar.css"

import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useRef } from 'react'

export default function ScrollCalendar() {
  const navigate = useNavigate()
  const monthRef = useRef(null)

  useEffect(() => {
    if (monthRef.current) {
      monthRef.current.scrollIntoView({behavior: 'smooth'})
    }
  })
  // 먼저 올해의 년도를 구한다.
  // 그리고 12월을 구해서 각각에 대해서 days 를 저장한다.
  // let month = [{month: 0, days: [220101, 220102....]}, {month: 0, days: [220101, 220102....]}, ...]
  let months = [];
  const today = new Date();
  const year = today.getFullYear()
  // 캘린더 만드는 함수
  function calMonth(month) {
    // 달의 시작일 구하기
    const firstDate = new Date(year, month, 1)
    const firstDateofWeek = firstDate.getDay()
    // 달의 시작 주차의 일요일 날짜
    const firstDateofMonth = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate() - firstDateofWeek
    );
    // 달의 마지막 일
    const lastDate = new Date(year, month + 1, 0)
    const lastDateofWeek = lastDate.getDay()
    // 달의 마지막 주차의 토요일 날짜
    const lastDateofMonth = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate() + (6 - lastDateofWeek)
    )

    let monthlyDays = []
    let day = firstDateofMonth
    while (day <= lastDateofMonth) {
      let days = {
        date: day, 
        common: false,
        url: '',
      }
      if (day.getMonth() === month) {
        monthlyDays.push(days)
      } else {
        monthlyDays.push(" ")
      }
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    }
    let json = {
      month: month,
      dates: monthlyDays,
    };
    return json;
  }

  for (let i = 0; i < 12; i++) {
    months.push(calMonth(i))
  }
  // 데이터 가져오기
  const userDetail = useSelector((state) => state.userDetail)

  let posts = userDetail.postDTOS.filter(post => post.category === 'photogroup')
  
  function calIntersection() {
    for (let time in posts) {
      let date = new Date(posts[time].time)
      let m = date.getMonth()
      let month = months[m].dates
      for (let d in month) {
        let day = month[d]
        if (day === ' ') {
          continue
        }
        if (date.getFullYear() ===  day.date.getFullYear() && date.getDate() === day.date.getDate()) {
          // common true 로 바꾸고 url 정보 입력해주기
          month[d].common = true
          month[d].url = posts[time].url
          month[d].id = posts[time].id
        }
      } 
    }
  }

  calIntersection()
  
  return (
    <div className="calendar-container">
      {months.map((m) => (
        <div className="container-row" key={m.month}>
          <div className="month" ref={today.getMonth() === m.month ? monthRef : null}>{m.month + 1}월</div>
          <div className="container">
            <div className="days">일</div>
            <div className="days">월</div>
            <div className="days">화</div>
            <div className="days">수</div>
            <div className="days">목</div>
            <div className="days">금</div>
            <div className="days">토</div>
          </div>
          <div className="container">
            {m.dates.map((day, idx) => (
              day === " " ?
                (<div key={idx}></div>) :
                (day.common ?
                  (<div key={idx} className="img-common" style={{ cursor: 'pointer' }} onClick={() => {navigate(`/community/${btoa(day.id * 73 + 37)}`)}}><img className="img-common-img" src={day.url} alt="이미지"></img></div>) :
                  (<div key={idx} className="date">{day.date.getDate()}</div>)
                )
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}