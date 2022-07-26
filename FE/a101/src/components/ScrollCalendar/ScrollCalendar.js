import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


const Item = styled(Paper)(({ theme, props }) => ({
  backgroundImage: `url(${props.img})`,
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.title,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = ("0" + today.getDate()).slice(-2);
var dateString = year + "-" + month + "-" + day;

console.log(dateString);

export default function ScrollCalendar() {
  return (
    <div>
      <Months />
    </div>
  );
}

function Months() {
  const imgRoute =  '../../assets/full.jpg';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction="row" rowSpacing={1}>
        <Grid item xs={12}>
          <Item img={imgRoute}>{month}월</Item>
        </Grid>
        <Grid item xs>
          <Days />
        </Grid>
      </Grid>
    </Box>
  );
}

function Days() {
  // const date = ['월', '화', '수', '목', '금', '토', '일']
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs>
          <Item>일</Item>
        </Grid>
        <Grid item xs>
          <Item>월</Item>
        </Grid>
        <Grid item xs>
          <Item>화</Item>
        </Grid>
        <Grid item xs>
          <Item>수</Item>
        </Grid>
        <Grid item xs>
          <Item>목</Item>
        </Grid>
        <Grid item xs>
          <Item>금</Item>
        </Grid>
        <Grid item xs>
          <Item>토</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

// import React, { useState } from 'react';
// import { Icon } from '@iconify/react';
// import { format, addMonths, subMonths } from 'date-fns';
// import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
// import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

// const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
//     return (
//         <div className="header row">
//             <div className="col col-start">
//                 <span className="text">
//                     <span className="text month">
//                         {format(currentMonth, 'M')}월
//                     </span>
//                     {format(currentMonth, 'yyyy')}
//                 </span>
//             </div>
//             <div className="col col-end">
//                 <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} />
//                 <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
//             </div>
//         </div>
//     );
// };

// const RenderDays = () => {
//     const days = [];
//     const date = ['Sun', 'Mon', 'Thu', 'Wed', 'Thrs', 'Fri', 'Sat'];

//     for (let i = 0; i < 7; i++) {
//         days.push(
//             <div className="col" key={i}>
//                 {date[i]}
//             </div>,
//         );
//     }

//     return <div className="days row">{days}</div>;
// };

// const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const rows = [];
//     let days = [];
//     let day = startDate;
//     let formattedDate = '';

//     while (day <= endDate) {
//         for (let i = 0; i < 7; i++) {
//             formattedDate = format(day, 'd');
//             const cloneDay = day;
//             days.push(
//                 <div
//                     className={`col cell ${
//                         !isSameMonth(day, monthStart)
//                             ? 'disabled'
//                             : isSameDay(day, selectedDate)
//                             ? 'selected'
//                             : format(currentMonth, 'M') !== format(day, 'M')
//                             ? 'not-valid'
//                             : 'valid'
//                     }`}
//                     key={day}
//                     onClick={() => onDateClick(parse(cloneDay))}
//                 >
//                     <span
//                         className={
//                             format(currentMonth, 'M') !== format(day, 'M')
//                                 ? 'text not-valid'
//                                 : ''
//                         }
//                     >
//                         {formattedDate}
//                     </span>
//                 </div>,
//             );
//             day = addDays(day, 1);
//         }
//         rows.push(
//             <div className="row" key={day}>
//                 {days}
//             </div>,
//         );
//         days = [];
//     }
//     return <div className="body">{rows}</div>;
// };

// export default function ScrollCalendar() {
//     const [currentMonth, setCurrentMonth] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState(new Date());

//     const prevMonth = () => {
//         setCurrentMonth(subMonths(currentMonth, 1));
//     };
//     const nextMonth = () => {
//         setCurrentMonth(addMonths(currentMonth, 1));
//     };
//     const onDateClick = (day) => {
//         setSelectedDate(day);
//     };
//     return (
//         <div className="calendar">
//             <RenderHeader
//                 currentMonth={currentMonth}
//                 prevMonth={prevMonth}
//                 nextMonth={nextMonth}
//             />
//             <RenderDays />
//             <RenderCells
//                 currentMonth={currentMonth}
//                 selectedDate={selectedDate}
//                 onDateClick={onDateClick}
//             />
//         </div>
//     );
// };
