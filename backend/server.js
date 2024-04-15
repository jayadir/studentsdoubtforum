const express = require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app = express();
const path=require('path');
const port=process.env.PORT || 5000;
const connectDB = require('./Database/db');
const router=require('./Routes/routes');

connectDB();
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(express.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');
    next();
})
app.use('/api',router);
app.use('/uploads',express.static(path.join(__dirname,'/../uploads')));
app.use(express.static(path.join(__dirname,'/../frontend/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/../frontend/build/index.html'));
})
app.use(cors())
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
}) 