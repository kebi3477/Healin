const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);
const crypto = require('crypto');
const secret = 'MyScreasdasd!!32131acdas';

connection.connect(err => {
    if(err) console.log(err)
});

router.post('/signIn', (req, res) => { //로그인
    const user = req.body;
    const hashed = crypto.createHmac('sha256', secret).update(user.pw).digest('hex');
    const sql = `select * from users where id = '${user.id}' and password = '${hashed}'`;
    console.log(hashed);
    let status = {
        "result": ""
    };
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        if(rows.length === 1) {
            console.log("로그인 성공!");
            req.session.uid = rows[0].id;
            req.session.save();
            status.result = 'success';
        } else {
            console.log("로그인 실패!..");
            status.result = 'fail';
        }
        res.json(status);
    })
})

router.post('/signUp', (req, res) => { //회원가입
    const user = req.body;
    const hashed = crypto.createHmac('sha256', secret).update(user.pw).digest('hex');
    console.log('hashed :', hashed);
    const sql = `insert into users values('${user.id}','${hashed}','${user.email}')`;
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        else console.log(rows.insertId)
    })
})

router.post('/idCheck', (req, res) => { //아이디 중복 확인
    console.log(req.session.uid)
    const user = req.body;
    const sql = `select * from users where id = '${user.id}'`;
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        const result = { length : rows.length };
        res.json(result);
    })
})

router.post('/emailCheck', (req, res) => { //이메일 중복 확인
    const user = req.body;
    const sql = `select * from users where email = '${user.email}'`;
    connection.query(sql, (err, rows) => {
        if(err) throw err;
        console.log(rows);
        const result = { length : rows.length }
        res.json(result);
    })
})

module.exports = router;