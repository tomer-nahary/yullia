import React from 'react'
import { Line } from 'react-chartjs-2';
import '../../styles/IncomeChart.css';

export default function IncomeChart(props) {
    const totalIncome = props.totalIncome;
    if(!totalIncome || totalIncome.length < 1) return <></>;
    let data = totalIncome && {
        labels: totalIncome.map(a => a.date),
        datasets: [{
            label: 'הכנסה',
            data: totalIncome.map(a => parseInt(a.totalIncome) / 1000),
            fill: false,
            borderColor: '#f13239',

            tension: 0.1
        },
        {
            label: 'יעד',
            data: totalIncome.map(a => parseInt(a.totalTarget) / 1000),
            fill: false,
            borderColor: '#6c54f1',
            tension: 0.1        
        }]
    };
    let options = {
        plugins: {
            legend: {
                onClick: null,
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'תאריך',
                    font: {weight: 'bold', size: 18},
                    padding: 0
                },
                ticks: {
                    font: {weight: 'bold', size: 13}
                }
            },
            y: {
                ticks: {
                    font: {weight: 'bold', size: 13}
                }
            }
        }
    }
    const toCurrency  = (str) =>{
        if(!str) return;
        return str.toLocaleString('en') + ' ₪';
    }
    const income = totalIncome[totalIncome.length - 1].totalIncome;
    const target = totalIncome[totalIncome.length - 1].totalTarget;
    const precent = Math.round((income / target) * 100);
    return (
        <div className="income-div">
            <div className="income-line-chart">
                <Line data={data}  options={options}/>
            </div>

            <table className="income-table">
                <tbody>
                    <tr>
                        <th>הכנסה מצטברת</th>
                        <td>{toCurrency(income)}</td>
                    </tr><tr>
                        <th>יעד מצטבר</th>
                        <td>{toCurrency(target)}</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td className="income-precent">{precent}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
