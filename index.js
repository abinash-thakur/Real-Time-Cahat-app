const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static('./backend'));
app.use(express.static('./css'));
app.use(express.static('./html'));
app.use(express.static('./images'));
app.use(express.static('./js'));
app.use(express.static('./sound'));
app.use(express.json());

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/html/index.html'));
})
app.listen(port,(req,res)=>{
    console.log("node app is running");
})