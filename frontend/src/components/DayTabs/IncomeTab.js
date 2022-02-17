import React from 'react'
import Info from './Info';
import IncomeChart from "../../components/Charts/IncomeChart";
export default function IncomeTab(props) {
    const {tab, newData,data, updateNewData, edit} = props;
    return (
        <>
        {tab === 'income' &&
        <div className="tab-chart">
            <IncomeChart totalIncome={data.totalIncome}/>
        </div>
        }
        <div className={'day-tab ' + (tab === 'income' ? '' : 'hide-tab')}>
            <Info name="income" type="money" label="הכנסות" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <Info name="target" type="money" label="יעד" data={data} newData={newData} update={updateNewData} edit={edit}/>
            <div className="tab-part"></div>
            <Info name="precent" type="precent" label="עמידה ביעד" data={data} newData={newData} update={updateNewData} edit={false}/>
        </div>
        </>
    )
}
