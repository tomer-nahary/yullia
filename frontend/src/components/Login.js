import axios from 'axios';
import React, { useState } from 'react';
import  '../styles/Login.css';
import Logo from '../assets/logo.svg';
import { useUser } from '../contexts/UserContext';
import { Redirect } from 'react-router';

export default function Login(props) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [keep, setKeep] = useState(false);

    const {user, login, logInFailed, logInTry} = useUser();

    const logInUser = ()=> login(userId, password, keep);
    const infoPress = (e) =>{
      if(e.key === 'Enter') logInUser();
    }

    if(user.isAuth) return <Redirect to="/" />
    return (
        <div className="login">
            <div className="login-box">
                <img src={Logo} className="login-logo" alt='Yullia' />
                <div className="login-info">
                    <label  onClick={() => console.log(logInFailed)}>שם משתמש:</label>
                    <input type="text" id="user" value={userId} onChange={e => setUserId(e.target.value)} maxLength="9" onClick={logInTry} onKeyPress={infoPress} />
                </div>
                <div className="login-info">
                    <label>סיסמה:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} maxLength="45" onClick={logInTry} onKeyPress={infoPress}/>
                </div>
                <div className="login-check" onClick={() => setKeep(!keep)}>
                    <div className={'check ' + (keep ? '' :'not-checked' )}/>
                    <div>הישאר רשום</div>
                </div>
                <input type="button" id="login" className="shadow" value="כניסה" onClick={logInUser}/>
                <div className={'login-failed ' + (logInFailed ? 'addOpacity' : '')}>
                    <label>פרטי התחברות שגויים</label>
                </div>
            </div>
        </div>
    )
}
