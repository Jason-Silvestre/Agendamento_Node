const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ServicoAgendamento = require("./services/ServicoAgendamento");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/agendamento",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/cadastro",(req, res) => {
    res.render("create");
})

app.post("/create", async (req,res) => {
  
 var status = await ServicoAgendamento.Create(
      req.body.name, 
      req.body.address,
      req.body.description,
      req.body.date,
      req.body.time,
      req.body.age, 
      req.body.gender,
      req.body.email,
      req.body.cpf
     )

  if(status){
    res.redirect("/");
  }else{
      res.send("Ocorreu uma falha!");
  }

});

app.get("/getcalendar" , async (req, res) => {
    var visits = await ServicoAgendamento.GetAll(false);
    res.json(visits);
});

app.get("/event/:id",async (req, res) =>{
    var visita = await ServicoAgendamento.GetById(req.params.id);
    console.log(visita);
    res.render("event", {visit: visita});
})

app.post("/finish", async (req, res) => {
    var id = req.body.id;
    var result = await ServicoAgendamento.Finish(id);
    res.redirect("/");
});

app.get("/list", async (req, res) => {
    
//await ServicoAgendamento.Search();
    
    var vis = await ServicoAgendamento.GetAll(true);
    res.render("list",{vis});
});

app.get("/searchresult", async (req, res) => {
   var vis = await ServicoAgendamento.Search(req.query.search);
    res.render("list",{vis});
})

var pollTime = 5000 ;

setInterval(async () => {
 
    await ServicoAgendamento.SendNotification();

},pollTime) 

app.listen(8080, () => {});