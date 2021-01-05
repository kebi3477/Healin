const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);
const crypto = require('crypto');
const secret = 'MyScreasdasd!!32131acdas';
const nodemailer = require('nodemailer');
const gmail = require('./gmail.js');

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
        if(err) {
            throw err;
        } else {
            const result = { length : rows.length }
            console.log(rows);
            res.json(result);
        }
    })
})

router.post('/emailCertified', (req, res) => {
    const authMail = gmail.authMail;
    const toMail = req.body.email;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        prot: 587,
        secure: false,
        auth: {
            user: authMail,
            pass: gmail.password
        },
    })
    const mailOptions = {
        from: `HEALIN <${authMail}>`,
        to: toMail,
        subject: '[HEALIN] 본인 인증 안내',
        html: `<div style="width: 100%; height: 98vh; background-color: #ddd; padding-top: 2vh;">
            <div style="max-width: 600px; background-color: #fff; margin: 0 auto; padding-bottom: 10px;">
                <div style="width: max-content;margin: 0 auto;text-align: center;color: #333;font-size: 1.7rem;font-weight: bold;padding: 3%;border-bottom: 1px solid #333;">HEALIN</div>
                <div style="width: 96%;text-align: center;font-weight: bold;color: #333;font-size: 1.2rem;border-top: .25px solid #dddddd;padding: 2%;">안녕하세요!</div>
                <p style="width: 94%;text-align: center;border-bottom: .25px solid #dddddd;padding: 3%;padding-top: 0;margin: 0;">Healin을 이용해주셔서 감사합니다. 아래에 있는 이메일 코드를 입력해주세요!</p>
                <h2 style="width: max-content;padding: 1%;text-align: center;border: 1px solid black;margin: 3% auto;">123464</h2>
            </div>
        </div>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            const result = {
                info : info.response
            }
            res.json(result);
        }
    })
})

module.exports = router;