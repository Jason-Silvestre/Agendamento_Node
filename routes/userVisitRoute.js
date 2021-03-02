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



router.get("/cadastroUsuario", (req, res) => {
    res.render("create");
})

router.post("/create", async (req,res) => {
  
 var response= await servicoAgendamento.Create(
      req.body.name, 
      req.body.address,
      req.body.description,
      req.body.date,
      req.body.time,
      req.body.age, 
      req.body.email,
     )

     if(response) {
        res.send("Visita solicitada com sucesso !");
   }else{
         res.send("Formulário incompleto,por favor preencha todas as informações !");        
   }              
   });
   


/*
  if(status){
      
    res.redirect("/");
    res.send(alert("Visita solicitada com sucesso"));    
  }else{
      //res.send("Ocorreu uma falha!");
      res.send(JSON.stringify('error'));    
  }

}); 
*/

module.exports = router;



















//outra maneira de  solicitar visita native node

/*const express = require("express");
const router = express.Router();
const app=express();
const servicoAgendamento = require("../services/ServicoAgendamento");
*/
/*
router.post('/cadastro', async (req,res)=>{  
    let response = await servicoAgendamento.Create(
    req.body.name, 
    req.body.address,
    req.body.description,
    req.body.date,
    req.body.time,
    req.body.age, 
    req.body.email           
)
*/


/*
var name = req.params.name;
var address = req.params.adress;
var description = req.params.description;
var date = req.params.date;
var time = req.params.time;
var age = req.params.age;
var email = req.params.email;      
*/      

/*
if(response) {
     res.send(response);
}else{
      res.send(JSON.stringify('error'));        
}              
});

module.exports = router;
*/