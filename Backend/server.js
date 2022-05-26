const { application } = require('express');
const cors=require('cors')
const express = require('express');
const PORT=8999;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors())
//load routes
const postRoutes= require('./routes/postRoutes');
app.use("/",postRoutes)
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log("work on 8999")
}) 
