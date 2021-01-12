const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(err => {
    if(err) console.log(err)
});

router.post('/check', (req, res) => { //처음 메인 페이지 접속 시 세션 확인 유무
    const result = {
        nonLogin : '',
        nickName : req.session.uid
    }
    if(req.session.uid === undefined) {
        result.nonLogin = true;
    } else {
        result.nonLogin = false;
    }
    res.json(result);
})

router.post('/logout', (req, res) => { //로그아웃
    const result = {
        success : false
    }
    req.session.destroy(() => {
        req.session;
    })
    result.success = true;
    res.json(result);
})

module.exports = router;