const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('./database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(err => {
    if(err) console.log(err)
});

router.post('/check', (req, res) => {
    const result = {
        nonLogin : ''
    }
    if(req.session.uid === undefined) {
        result.nonLogin = true;
    } else {
        result.nonLogin = false;
    }
    res.json(result);
})

router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        req.session;
    })
})

module.exports = router;