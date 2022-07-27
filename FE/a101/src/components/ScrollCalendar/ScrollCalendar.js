import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import './ScrollCalendar.css'


const Item = styled(Paper)(({ theme, props }) => ({
  ...theme.typography.title,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// 오늘 연월일 구하기
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
// 달의 시작일 구하기
const firstDate = new Date(year, month, 1)
const firstDateofWeek = firstDate.getDay()
// 달의 시작 주차의 일요일 날짜
const firstDateofMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() - firstDateofWeek)
// 달의 마지막 일 
const lastDate = new Date(year, month + 1, 0)
const lastDateofWeek = lastDate.getDay()
// 달의 마지막 주차의 토요일 날짜
const lastDateofMonth = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate() + (6 - lastDateofWeek))
console.log(lastDateofMonth)

let monthlyDays = []
let day = firstDateofMonth
while (day <= lastDateofMonth) {
  monthlyDays.push(day)
  day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
  console.log(day)
}

export default function ScrollCalendar() {
  return (
    <div>
      <Months />
    </div>
  );
}

function Months() {
  const color = 'primary'
  return (
    <div className="container-row">
      <div className="month">
        7월
      </div>
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
        {
          monthlyDays.map(day =>
            <div className="date">{day.getDate()}</div>
          )
        }
      </div>
    </div>
  );
}