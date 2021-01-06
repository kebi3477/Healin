const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);
const crypto = require('crypto');
const secret = 'MyScreasdasd!!32131acdas';
const nodemailer = require('nodemailer');
const gmail = require('./gmail.js');
let publicCertifiedNumber;

connection.connect(err => {
    if(err) console.log(err)
});

const makeCertifiedNumber = () => {
    const max = 999999;
    const min = 100000;
    let num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

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
    const certifiedNumber = makeCertifiedNumber();
    const mailOptions = {
        from: `HEALIN <${authMail}>`,
        to: toMail,
        subject: '[HEALIN] 본인 인증 안내',
        html: `<div style="font-family: initial; background-color: #f9f9f9; width: 100%; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <h1 style="font-size: 48px; font-weight: bold;">HEALIN</h1>
            <div style="overflow: hidden; position: relative; box-sizing: border-box; margin-top: 20px; box-shadow: 0px 0px 4px rgba(0,0,0, 0.2); border-radius: 4px; background-color: #ffffff; width: 640px; padding: 30px 40px; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; ">
            <h3>안녕하세요! HEALIN 입니다.</h3>
            <p style="margin-top: 20px;">
                Healin 회원가입 본인 확인 메일 입니다.<br>
                아래에 인증번호를 입력하고, 본인 인증을 완료해주십시오.
            </p>
            <strong style="margin: 10px 0px; padding: 10px; font-size: 20px; border: 1px solid #000;">${certifiedNumber}</strong>
            <p>
                Healin를 이용해 주셔서 감사합니다.
            </p>
            <h6 style="margin-top: 40px;">Copyright ⓒHEALIN. All Rights Reserved.</h6>
            <h1 style="cursor: default; position: absolute; right: 0px; bottom: 0px; transform: translate(15%, 40%); opacity: 0.25; font-size: 8rem; font-weight: bold;">HEALIN</h1>
            </div>
        </div>`
    }
    
    publicCertifiedNumber = certifiedNumber;
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

router.post('/emailCertifiedCheck', (req, res) => {
    const result = {
        check : ""
    }
    if(parseInt(req.body.number) === publicCertifiedNumber) {
        result.check = true;
    } else {
        result.check = false;
    }
    res.json(result);
})

router.get('/certifiedNumberDelete', (req, res) => {
    publicCertifiedNumber = 0;
})

module.exports = router;