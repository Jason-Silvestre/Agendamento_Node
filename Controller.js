const express = require("express");
const cors=require('cors');
const bodyParser = require("body-parser");
const models=require('./models');
const app=express();
const mongoose = require("mongoose");
const ServicoAgendamento = require("./services/ServicoAgendamento");
const servicoAgendamento = require("./services/ServicoAgendamento");

//Database
//------------------------------------------------------------
  
mongoose.connect("mongodb://localhost:27017/agendamento",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

//------------------------------------------------------------

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));//muito importante para  apresentar o calendario
app.set('view engine', 'ejs'); 
let user=models.User; 

//------------------------------------------------------------
//chamando as rotas
let userVisitRoute = require('./routes/userVisitRoute');
app.use('/', userVisitRoute)

let pastorLoginRoute = require('./routes/pastorLoginRoute');
app.use('/', pastorLoginRoute)

let calendarioVisitasRoute = require('./routes/calendarioVisitasRoute');
app.use('/', calendarioVisitasRoute)

let gerenciarVisitasRoute = require('./routes/gerenciarVisitasRoute');
app.use('/', gerenciarVisitasRoute)

let pastorAllVisitsRoute = require('./routes/pastorAllVisitsRoute');
app.use('/', pastorAllVisitsRoute)

let criarVisitaRoute = require('./routes/criarVisitaRoute');
app.use('/', criarVisitaRoute)

let financeiroRoute = require('./routes/financeiroRoute');
app.use('/', financeiroRoute)

let cadastroVisitaRoute = require('./routes/cadastroVisitaRoute');
app.use('/', cadastroVisitaRoute)

let pastorLocalizaVisitaRoute = require('./routes/PastorLocalizaVisitaRoute');
app.use('/', pastorLocalizaVisitaRoute)

let pastorTerminaVisitaRoute = require('./routes/PastorTerminaVisitaRoute');
app.use('/', pastorTerminaVisitaRoute)

//------------------------------------------------------------

//Essa rota é muito importante
//manter essa rota aqui mesmo para não dar bug
app.get("/event/:id",async (req, res) =>{
    var visita = await ServicoAgendamento.GetById(req.params.id);
    console.log(visita);
    res.render("event", {visit: visita});
}); 
//fim das rotas 

//------------------------------------------------------------


//notifica por email ao usuário sobre a visita
var pollTime = 1000 * 60 * 1;
setInterval(() => { 
     ServicoAgendamento.SendNotification();
},pollTime) 

//------------------------------------------------------------
//conectando servidor opção 1
let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});

//opção 2 para se conectar ao servidor
//app.listen(3000, () => {});


