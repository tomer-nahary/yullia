const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/list', async (req, res) =>{
    let [data, err] = await db('sp_branches_get_list', [req.user.branch]);
    if(err) return res.sendStatus(500);
    res.json(data[0]);
});

router.get('/name/:id', async (req, res) =>{
    let [data, err] = await db('sp_branches_get', [req.params.id]);
    if(err) return res.sendStatus(500);
    res.send(data[0][0]);
})


router.get('/monthlydata', async (req, res) =>{
    const {branch, date} = req.query;
    if(!branch || !date) return res.sendStatus(400);
    if(req.user.branch && req.user.branch != branch) return res.sendStatus(403);
    let [data, err] = await db('sp_data_get_month', [branch, date]);
    if(err) return res.sendStatus(500);
    let response = {month: data[0]};
    if(req.user.branch && req.user.branch != branch) return res.sendStatus(403);
    [data, err] = await db('sp_income_get_full_month', [branch, date]);
    response.totalIncome = data[0];
    if(err) return res.sendStatus(500);
    res.json(response);
});

router.get('/data', async (req, res) =>{
    const {branch, date} = req.query;
    if(!branch || !date) return res.sendStatus(400);
    if(req.user.branch && req.user.branch != branch) return res.sendStatus(403);
    let [data, err] = await db('sp_data_get_day', [branch, date]);
    if(err) return res.sendStatus(500);

    


    if(data[0][0] == null){
        [data, err] = await db('sp_treater_get', [branch]);
        if(err) return res.sendStatus(500);
    }
    else {
        [totalIncome, err2] = await db('sp_income_get_month', [branch, date]);    
        if(err2) return res.sendStatus(500);
        data[0][0]['totalIncome'] = totalIncome[0];
    }
    res.json(data[0][0]);
});

router.put('/data', async (req, res) =>{
    Object.keys(req.body).forEach(key =>{
        if(key != 'date') req.body[key] = toNum(req.body[key]);
    })
    const { date, branch, income, target, tip, customerNumber, treatmentNumber, seriesTreatmentNumber, treaterNumber, clubNumber, itemsNumber, itemsIncome, earPiercing, parking, treatmentHours, wax1, wax2, wax3} = req.body;
    let [data, err] = await db('sp_data_update', [date, branch, income, target, tip, customerNumber, treatmentNumber, seriesTreatmentNumber, treaterNumber,clubNumber,itemsNumber,itemsIncome,earPiercing,parking,treatmentHours, wax1, wax2, wax3]);
    if(err) return res.sendStatus(500);
    res.json(data[0][0]);
});

router.get('/month-income', async (req, res) =>{
    const {branch, date} = req.query;
    if(!branch || !date) return res.sendStatus(400);
    if(req.user.branch && req.user.branch != branch) return res.sendStatus(403);
    let [data, err] = await db('sp_income_get_month', [branch, date]);
    if(err) return res.sendStatus(500);
    res.json(data);
})

router.get('/customer-count', async (req, res) => {
    const {branch, date} = req.query;
    if(!branch || !date) return res.sendStatus(400);
    if(req.user.branch && req.user.branch != branch) return res.sendStatus(403);
    let [data, err] = await db('sp_customer_count', [branch, date]);
    if(err) return res.sendStatus(500);
    res.json(data[0][0].customer_count);
})

function toNum(str){
    if(!str || str === '') return null;
    return Number(str);
}
module.exports = router;