import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router';
import { useUser } from '../contexts/UserContext';
import '../styles/Menu.css';
import markIcon from '../assets/mark.png';
export default function Menu(props){

    const {user, logout} = useUser()
    const history = useHistory();
    const [branches, setBranches] = useState();

    const getBranches= () =>{
        axios.get('/api/branch/list')
        .then(res => setBranches(res.data));
    }
    const updateBranch = (id) =>{
        history.push('/' + id + props.getCurDate());
        props.close();
    }
    useEffect(getBranches, []);
    useEffect(() => document.body.style.overflow = props.display ? 'hidden' : 'auto', [props.display]);    
    if(!branches) return <></>;
    return (
        <div className={`menu ${props.display? 'display-menu' : ''}`}>
            <div>
                <div className="menu-title">
                    <span>בחירת סניף</span>
                </div>
                <ul className="branches">
                    {branches.map(branch =>(
                    <li key={branch.id} className="branch-li">
                        <img src={markIcon} height="20"/>
                        <button onClick={() => updateBranch(branch.id)}>{branch.name}</button>
                    </li>
                    ))}
                </ul>
                <div className="logout">
                    <button onClick={logout}>התנתקות</button>
                </div>
            </div>
        </div>
    )
}
