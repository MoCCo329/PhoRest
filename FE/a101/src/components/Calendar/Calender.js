import './Calendar.css'

export default function Calendar() {
  return (
    <div>
      <ThisMonth />
    </div>
  )
}

let months = []
const today = new Date()
const year = today.getFullYear()
const month = today.getMonth()
function calMonth(month) {
  // 달의 시작일 구하기
  const firstDate = new Date(year, month, 1)
  const firstDateofWeek = firstDate.getDay()
  // 달의 시작 주차의 일요일 날짜
  const firstDateofMonth = new Date(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    firstDate.getDate() - firstDateofWeek
  )
  // 달의 마지막 일
  const lastDate = new Date(year, month + 1, 0)
  const lastDateofWeek = lastDate.getDay()
  // 달의 마지막 주차의 토요일 날짜
  const lastDateofMonth = new Date(
    lastDate.getFullYear(),
    lastDate.getMonth(),
    lastDate.getDate() + (6 - lastDateofWeek)
  )

  let monthlyDays = [];
  let day = firstDateofMonth
  while (day <= lastDateofMonth) {
      monthlyDays.push(day)
    day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
  }
  let json = {
    month: month,
    dates: monthlyDays,
  }
  return json
}

months = calMonth(month)

function ThisMonth() {
  return (
    <div>
      <div className="container-row">
        <div className="month">{months.month + 1}월</div>
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
          {months.dates.map((day, index) => (
            <div key={index} className="date">
              {day.getDate()}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}