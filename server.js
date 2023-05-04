const express = require('express');
const port = process.env.PORT || 5000
const path = require('path')

const app = express();

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

app.listen(port,()=>{
    console.log(`Noise tracker app listen on port ${port}`)
})