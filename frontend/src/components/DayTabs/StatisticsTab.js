import React from 'react'
import Info
 from './Info';
export default function StatisticsTab(props) {
    const {tab, newData,data, updateNewData, edit} = props;
    return (
        <div className={'day-tab ' + (tab === 'statistics' ? '' : 'hide-tab')}>
            
            <div className="tab-part"></div>
            <Info name="efficiency" label="מדד יעילות" data={data} newData={newData} update={updateNewData} edit={false}/>
            <Info name="averagePerHour" label="ממוצע לשעת טיפול" data={data} newData={newData} update={updateNewData} edit={false}/>
            <Info name="averagePerCustomer" label="ממוצע לעסקה" data={data} newData={newData} update={updateNewData} edit={false}/>
        </div>
    )
}
