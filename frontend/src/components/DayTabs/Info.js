import React, { useEffect, useState } from 'react'

export default function Info(props) {
    return(
        <div className="day-item">
            <span className="day-label">{props.label}</span>
            <InfoData props={props}/>
        </div>
    )
}

function InfoData({props}){
    const {newData, data, name, update, edit, type} = props;
    let sign = '';
    if(type == 'money') sign = ' ₪';
    if(type == 'precent') sign = '%';
    const addCommas  = (str) =>{
        if(str === null) return;
        if(type == 'precent') return str;
        return str.toLocaleString('en');
    }
    if(edit) return(
        <input type="number" min='0' max='100000' className={'day-info' + (edit ? ' info-edit' : '')} name={name} value={newData[name] == null ? '' : newData[name]} onChange={update} />
    )
    else if(data[name] != null) return(
        <div className="day-info">{addCommas(data[name]) + sign}</div>
    )
    else return(
        <div className="day-info">-</div>
    )
}