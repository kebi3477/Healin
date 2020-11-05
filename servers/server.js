const express = require('express');
//const cors = require('cors');
const route = require('./routes/index');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;

//app.use(cors());

app.use(bodyParser.json());
app.use('/api', route);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})