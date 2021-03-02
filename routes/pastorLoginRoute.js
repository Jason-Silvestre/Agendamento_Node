const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const models=require('../models');
const app=express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 let user=models.User; 
 

router.post('/login',async (req,res)=>{
    //console.log(req.body);
   let response=await user.findOne({
        where:{name:req.body.name, password: req.body.password}
    });
    //console.log(response);
    if(response === null){
        res.send(JSON.stringify('error'));  
    }else{
        res.send(response);
    }
});

module.exports = router;