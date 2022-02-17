import axios from 'axios';
import {React, useEffect, useState} from 'react'
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import {useUser} from '../contexts/UserContext';
import '../styles/DayView.css';
import IncomeTab from './DayTabs/IncomeTab';
import IncomeTypesTab from './DayTabs/IncomeTypesTab';
import StatisticsTab from './DayTabs/StatisticsTab';
import MoreInfoTab from './DayTabs/MoreInfoTab';

export default function DayView(props) {
    const {user} = useUser();
    const [data, setData] = useState({});
    const [newData, setNewData] = useState({});
    const [edit, setEdit] = useState(false);
    const {branch, year, month, day, tab} = useParams();
    const history = useHistory();

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const dayOfWeek = days[(new Date(year, month - 1, day)).getDay()];
    const dateStr = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;

    const getCurDate = () => {
        let today = new Date();
        return `/${today.getFullYear()}/${today.getMonth() + 1}`;
    }
    const isValid = () =>{
        if(!branch || !year || !month || !day) return false;
        let lastDay = (new Date(year, month, 0)).getDate();
        return branch > 0 && year > 1999 && year < 3001 && month > 0 && month < 13 && day > 0 && day < lastDay + 1;
    }
    const getData = () =>{
        axios.get('/api/branch/data', {params: {branch, date: `${year}-${month}-${day}`}})
        .then(res =>{
            console.log(res.data);
            setData(res.data);
        });
    }
    const updateNewData = (e) =>{
        let {name, value} = e.target;
        setNewData(prev => {return {...prev, [name]: value}});
    }
    const openTab = (e) =>{
        let tabName = e.target.getAttribute('tab');
        history.push('./' + tabName);
    }

    
    const toggleEdit = () =>{
        if(!edit) return setEdit(true);
        let date = `${year}-${month}-${day}`;
        axios.put('/api/branch/data', {...newData, date, branch})
        .then(res => {
            setData(res.data);
            setEdit(false);
        })
        .catch(() => alert('הנתונים לא נשמרו'));
    }

    useEffect(getData, []);
    useEffect(() => {
        if(edit) setNewData(data);
        else setNewData({});
    },[edit]);

    if(!user.isAuth) return <Redirect to="/login" />;
    if(!isValid()) return <Redirect to={'/' + (user.branch || 1) + getCurDate()}/>
    return (
        <div>
            <div className="home-top shadow">
                <button onClick={() => history.push(`/${branch}/${year}/${month}`)} className='day-view-btn'/>
            </div>
            <div className="day-view-info">
                <span className="day-view-day">{dayOfWeek}</span>
                <span className="day-view-date">{dateStr}</span>
                <button className={ 'day-edit' +  (edit ? ' day-save'  : '')} onClick={toggleEdit}></button>
            </div>
            <div>
                <div className="day-tabs">
                    <button className={'day-tab-btn' + (tab === 'income' ?  ' active-tab' : '')} tab="income" onClick={openTab}>הכנסה</button>
                    <button className={'day-tab-btn' + (tab === 'income-types' ?  ' active-tab' : '')} tab="income-types" onClick={openTab}>סוגי הכנסה</button>
                    <button className={'day-tab-btn' + (tab === 'more-info' ?  ' active-tab' : '')} tab="more-info" onClick={openTab}>נתונים תפעוליים</button>
                    <button className={'day-tab-btn' + (tab === 'statistics' ?  ' active-tab' : '')} tab="statistics" onClick={openTab}>סטטיסטיקות</button>
                    {/* <button className="day-tab-btn" tab="statistics" onClick={openTab}>סטטיסטיקות</button> */}
                </div>
            </div>


            <IncomeTab tab={tab} data={data} newData={newData} updateNewData={updateNewData} edit={edit}/>
            <IncomeTypesTab tab={tab} data={data} newData={newData} updateNewData={updateNewData} edit={edit}/>
            <StatisticsTab tab={tab} data={data} newData={newData} updateNewData={updateNewData} edit={edit}/>
            <MoreInfoTab tab={tab} data={data} newData={newData} updateNewData={updateNewData} edit={edit}/>
        </div>
    )
}
