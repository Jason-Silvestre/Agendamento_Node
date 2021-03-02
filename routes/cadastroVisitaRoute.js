const express = require("express");
const router = express.Router();
const cors=require('cors');
const bodyParser = require("body-parser");
const models=require('../models');
const app=express();
const connection = require("../database/database");
const mongoose = require("mongoose");
const ServicoAgendamento = require("../services/ServicoAgendamento");
const servicoAgendamento = require("../services/ServicoAgendamento");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs'); 



mongoose.connect("mongodb://localhost:27017/agendamento",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

let user=models.User; 



router.get("/cadastro", (req, res) => {
    res.render("create");
})

router.post("/create", async (req,res) => {
  
 var response = await servicoAgendamento.Create(
      req.body.name, 
      req.body.address,
      req.body.description,
      req.body.date,
      req.body.time,
      req.body.age, 
      req.body.email,
     )

  if(response){
      
    res.redirect("/");
  }else{
      //res.send("Ocorreu uma falha!");
      res.send(JSON.stringify('error'));    
  }

}); 

module.exports = router;