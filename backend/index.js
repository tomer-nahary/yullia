const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const hour = 36000000;
const secretKey = fs.readFileSync('token.key').toString();

//Authentication

app.post('/api/login', async(req, res) =>{
    p = req.body;
    if(p.userId == null || p.password == null || p.keep == null) return res.sendStatus(400);

    let [data, err] = await db('sp_login', [p.userId, p.password]);
    if(err) return res.sendStatus(500);
    let userInfo = data[0][0];
    if(userInfo == null) return res.sendStatus(401);

    let token = jwt.sign({userInfo}, secretKey, {expiresIn: '1d'});
    let options = p.keep ? {httpOnly: true, maxAge: hour * 24 * 30 } : {httpOnly: true, expires: 0 }
    res.cookie('token', token, options);
    return res.json({isAuth: true ,...userInfo});   
});

app.post('/api/logout', (req, res) =>{
    res.clearCookie('token');
    res.sendStatus(200);
});

function authUser(req, res, next){
    req.user = {isAuth: false};
    if('token' in req.cookies){
        jwt.verify(req.cookies.token, secretKey, (err, user) =>{
            if(!err) req.user = {isAuth: true, ...user.userInfo};
            else res.clearCookie('token');
        })
    }
    if(!req.user.isAuth) return res.sendStatus(403);
    next();
}
app.use(authUser);

app.get('/api/user', (req, res) =>{
    res.json(req.user);
})

app.use('/api/branch', require('./Routes/branch'));

app.listen(4000, () => console.log('listening on port 4000!'));