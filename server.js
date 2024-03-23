const express = require('express')
const app = express()
const port = 2000

app.post('/signup',(req,res)=>{
    const {username,password} = req.body;
    if(!username||!password)
    {
        res.json({message:"all feilds required"});
    }
    res.json({message:"registered successfully"});
})


app.listen(port,()=>{
    console.log(`server is running`)
})