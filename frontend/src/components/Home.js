import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {Line} from 'react-chartjs-2';
import icon from '../assets/logo-white.png'
import {useUser} from '../contexts/UserContext';
import Menu from './Menu';
import MonthData from './MonthData';
import '../styles/Home.css'
import markIcon from '../assets/mark.png';
import IncomeChart from './Charts/IncomeChart';

export default function Home(props) {
    const {user} = useUser();
    const {branch, year, month} = useParams();
    const history = useHistory();
    const [branchData, setBranchData] = useState();
    const [customerCount, setCustomerCount] = useState();
    const [displayMenu, setDisplayMenu] = useState(false);
    const [branchName, setBranchName] = useState();
    const monthNames = ['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
    const totalIncome = branchData?.totalIncome;

    const changeBrnach = (num) =>{
        const NumOfBranches = 11;
        if(parseInt(branch) + num > NumOfBranches) return;
        history.push('/' + (parseInt(branch) + num ) + getCurDate());
    }

    const getBackArrow = () =>{
        if(!user.branch) return true;
        let d = new Date();
        let curYear = parseInt(d.getFullYear()), curMonth = parseInt(d.getMonth()) + 1
        if(year > curYear) return true;
        if(year < curYear) return false;
        if(parseInt(month) + 1 > curMonth) return true;
        return false;
    }
    const backArrow = getBackArrow();

    const getCurDate = () => {
        let today = new Date();
        return `/${today.getFullYear()}/${today.getMonth() + 1}`;
    }
    
    const isValid = () =>{
        if(!branch || !year || !month) return false;
        return branch > 0 && year > 1999 && year < 3001 && month > 0 && month < 13;
    }
    const changeMonth = (change) =>{
        if(change == 0) return history.push(`/${branch}` + getCurDate());
        let newMonth = Number(month) + change, newYear = Number(year);
        if(newMonth < 1 || newMonth > 12) {
            newMonth = Math.abs(12 - newMonth)
            newYear = newYear + (newMonth == 1 ? 1 : -1);
        }
        history.push(`/${branch}/${newYear}/${newMonth}`);
    }
    const getData = () => {
        if(!isValid()) return;
        axios.get('/api/branch/monthlydata', {params: {branch, date: `${year}-${month}-1`}})
        .then(res => setBranchData(res.data))
        .catch(err =>{
            if(err && err.response.status == 403) history.push('/');
        })
    }
    const getCustomerCount = () => {
        if(!isValid()) return;
        axios.get('/api/branch/customer-count', {params: {branch, date: `${year}-${month}-1`}})
        .then(res => setCustomerCount(res.data))
        .catch(err =>{
            if(err && err.response.status == 403) history.push('/');
        })
    }
    const getBranchName = () =>{
        if(!branch) return;
        axios.get('/api/branch/name/' + branch)
        .then(res => setBranchName(res.data.name));
    }
    useEffect(() => {
        getData();
        getCustomerCount();
    }, [month, branch]);
    useEffect(getBranchName, [branch]);
    if(!user.isAuth) return <Redirect to="/login" />;
    if(!isValid()) return <Redirect to={'/' + (user.branch || 1) + getCurDate()}/>
    return (
        <div>
            <div className="home-top shadow">
                <button onClick={() => setDisplayMenu(!displayMenu)} className={'menu-btn ' + (displayMenu ? 'menu-close' : '')}></button>
            </div>
            <Menu getCurDate={getCurDate} display={displayMenu} close={() => setDisplayMenu(false)}/>
            <div className="home-info">
                <div>
                    <span>שלום</span>
                    <span className="info-name">{user.name}</span>
                </div>
                <div style={{position: 'relative'}}>
                    <span style={{display: 'flex'}}><img style={{alignSelf: 'center'}} src={markIcon} width="30px" height="30px"/>סניף</span>
                    <span className="info-name">{branchName}</span>
                    <div className="branch-controls" style={{display: !user.branch ? 'flex' : 'none'}}>
                        <button onClick={ ()=> changeBrnach(-1)} className="branch-backwords"></button>
                        <button onClick={ ()=> changeBrnach(+1)} className="branch-forword"></button>
                    </div>
                </div>
            </div>
            <div className="home-con">
                <div className="home-nav">
                    <span className="home-date">{monthNames[month - 1]} {year}</span>
                    <div className="home-controls">
                        <button className="nav-back" disabled={!backArrow} onClick={() => changeMonth(-1)}></button>
                        <button className="nav-reset" onClick={() => changeMonth(0)}></button>
                        <button className="nav-forward" onClick={() => changeMonth(1)}></button>
                    </div>
                </div>
                <div className="customer-count">
                    <span className="customer-count-label">מספר לקוחות מצטבר</span>
                    <div className="customer-count-value">{customerCount && customerCount}</div>
                </div>
                <IncomeChart totalIncome={totalIncome} />
                <MonthData data={branchData?.month} year={year} month={month}/>
            </div>
        </div>
    )
}