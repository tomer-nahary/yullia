import React from 'react';
import Info from './Info';

export default function MoreInfoTab(props) {
    const {tab, newData,data, updateNewData, edit} = props;
    return (
        <div className={'day-tab ' + (tab === 'more-info' ? '' : 'hide-tab')}>
            <Info name="customerNumber" label="מספר לקוחות" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="treatmentNumber" label="מספר טיפולים" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="seriesTreatmentNumber" label="טיפולי סדרות" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="treaterNumber" label="מספר מטפלות" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="treatmentHours" label="שעות טיפול" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="itemsNumber" label="כמות מוצרים" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <div className="tab-part"></div>
        </div>
    )
}
