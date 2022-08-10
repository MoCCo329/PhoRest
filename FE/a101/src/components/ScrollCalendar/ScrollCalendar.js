import * as React from "react";
import "./ScrollCalendar.css";

import { useSelector } from "react-redux";

export default function ScrollCalendar() {
  // 먼저 올해의 년도를 구한다.
  // 그리고 12월을 구해서 각각에 대해서 days 를 저장한다.
  // let month = [{month: 0, days: [220101, 220102....]}, {month: 0, days: [220101, 220102....]}, ...]
  let months = [];
  const today = new Date();
  const year = today.getFullYear();
  // 캘린더 만드는 함수
  function calMonth(month) {
    // 달의 시작일 구하기
    const firstDate = new Date(year, month, 1);
    const firstDateofWeek = firstDate.getDay();
    // 달의 시작 주차의 일요일 날짜
    const firstDateofMonth = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate() - firstDateofWeek
    );
    // 달의 마지막 일
    const lastDate = new Date(year, month + 1, 0);
    const lastDateofWeek = lastDate.getDay();
    // 달의 마지막 주차의 토요일 날짜
    const lastDateofMonth = new Date(
      lastDate.getFullYear(),
      lastDate.getMonth(),
      lastDate.getDate() + (6 - lastDateofWeek)
    );

    let monthlyDays = [];
    let day = firstDateofMonth;
    while (day <= lastDateofMonth) {
      if (day.getMonth() === month) {
        monthlyDays.push(day);
      } else {
        monthlyDays.push(" ");
      }
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
    }
    let json = {
      month: month,
      dates: monthlyDays,
    };
    return json;
  }

  for (let i = 0; i < 12; i++) {
    months.push(calMonth(i));
  }
  // 데이터 가져오기
  const userDetail = useSelector((state) => state.userDetail);

  // 같은 날짜에 사진을 여러번 찍었네?

  let marks = new Map();

  console.log(months)
  console.log(userDetail.postDTOS)
  function calIntersection() {
    for (let time in userDetail.postDTOS) {
      let date = new Date(userDetail.postDTOS[time].time);
      let m = date.getMonth();
      let month = months[m].dates
      for (let d in month) {
        let day = month[d];
        if (day === ' ') {
          continue
        }
        if (date.getFullYear() ===  day.getFullYear() && date.getDate() === day.getDate()) {
          marks.set(day.getMonth(), day.getDate())
          console.log(marks)
          // 배경 이미지 넣기
        }
      } 
    }
  }

  calIntersection();
  const imageStyle={
    backgroundImage: `url(https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/0/FramePlusImg.png)`
    }
  return (
    <div>
      {months.map((m) => (
        <div className="container-row" key={m.month}>
          <div className="month">{m.month + 1}월</div>
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
            {m.dates.map((day, index) => (
              day === " " ? " " : 
              day.getDate() === marks.get(day.getMonth()) ? <div className="highlight" style={imageStyle}>{day.getDate()}</div> : <div className="date">{day.getDate()}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
