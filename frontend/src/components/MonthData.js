import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import '../styles/MonthData.css';


export default function MonthData(props) {
    const data = props.data;
    const [month, setMonth] = useState();
    const history = useHistory();
    const days = 'אבגדהוש';
    const pad = (num) => String(num).padStart(2,'0');
    const formatDate = (dateStr) =>{
        let date = new Date(dateStr);
        return `${ days[date.getDay()]}' ${pad(date.getDate())}/${pad(date.getMonth() + 1)}`
    }
    const sameDay = (d1, d2) => {
        return d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();
      }

    const getMonth = ()=>{
        if(!data) return;
        let obj = {};
        let today = new Date();
        let date = new Date(props.year, props.month - 1, 1);
        let dayDetails, index = 0;
        while(date.getMonth() + 1 == props.month){
            if(index < data.length && sameDay(new Date(date), new Date(data[index].date))){
                dayDetails = data[index];
                index++;
            }
            else dayDetails = null;
            obj[new Date(date)] = {
                isToday: sameDay(date, today),
                isSaturday: date.getDay() == 6,
                data: dayDetails
             };
            date.setDate(date.getDate() + 1);        
        }
        setMonth(obj);
    }
    const getClass = (day) =>{
        if(day.isSaturday) return 'month-saturday';
        let classes = '';
        if(day.isToday) classes += 'month-today ';
        if(!day.data) classes += 'month-new';
        return classes;

    }
    const goToDay = (date) => {
        let day = (new Date(date)).getDate();
        history.push(`${history.location.pathname}/${day}/income`);
    }
    const toCurrency  = (str) =>{
        if(!str) return;
        return str.toLocaleString('en') + ' ₪';
    }
    const toPrecent  = (str) =>{
        if(!str) return;
        return str + '%';
    }
    useEffect(getMonth, [data]);
    if(!month) return <></>;
    return (
        <table className="month-data">
            <tbody>
                <tr>
                    <th className="month-data-date">תאריך</th>
                    <th>הכנסה</th>
                    <th>יעד</th>
                    <th>%</th>
                </tr>
                {Object.keys(month).map(day =>(
                    <tr key={day} className={getClass(month[day])} onClick={() => {if(!month[day].isSaturday) goToDay(day)}}>
                        <td>{formatDate(day)}</td>
                        {month[day].isSaturday &&
                        <>
                        <td></td>
                        <td></td>
                        <td></td>
                        </>
                        }
                        {!month[day].isSaturday &&
                        <>
                        <td>{toCurrency(month[day]?.data?.income) || '-'}</td>
                        <td>{toCurrency(month[day]?.data?.target)  || '-'}</td>
                        <td>{toPrecent(month[day]?.data?.precent)  || '-'}</td>
                        </>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
