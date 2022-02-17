import React from 'react';
import Info from './Info';
export default function IncomeTypesTab(props) {
    const {tab, newData,data, updateNewData, edit} = props;
    return (
        <div className={'day-tab ' + (tab === 'income-types' ? '' : 'hide-tab')}>
            <Info name="tip" label="טיפ" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="itemsIncome" label="הכנסה ממוצרים" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="parking" label="חניה" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="earPiercing" label="Proven" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="wax1" label={data?.waxer1 || 'שעוונית 1'} data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="wax2" label={data?.waxer2 || 'שעוונית 2'} data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="wax3" label={data?.waxer3 || 'שעוונית 3'} data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="clubNumber" label="מועדון" data={data} newData={newData} update={updateNewData} edit={edit}/>
            
            <div className="tab-part"></div>
        </div>
    )
}
