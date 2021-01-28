const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const mongoose = require("mongoose");
const ServicoAgendamento = require("./services/ServicoAgendamento");
const servicoAgendamento = require("./services/ServicoAgendamento");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/agendamento",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//conexão mercado pago
const MercadoPago = require("mercadopago");
MercadoPago.configure({
    sandbox: true,
    access_token:"TEST-8069843486273788-012219-d8b9c8aac4ab8a3f4c5b3a925687104c-148888633"
});


//rotas agendamento de visita
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/cadastro",(req, res) => {
    res.render("create");
})

app.post("/create", async (req,res) => {
  
 var status = await servicoAgendamento.Create(
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
});

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
});

 //modulo financeiro
//rotas do mercado pago
app.get("/doacoes", (req, res) => {
    res.send(" Dizimos e ofertas no cartão de credito! " + Date.now());
});

app.get("/transferir",async (req, res) => {


var id = "" + Date.now();
var emailDoPagador = "jasonsilvestre34@gmail.com";
    var dados = {
        items: [
            item = {
                //UUID && Data
                id: id,
                title: "2 bíblias",
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(150)
            }
        ],
        payer:{
           email: emailDoPagador
        },
        external_reference:id,
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados);
        //Banco.SalvarPagamento({id: id, pagador: email});
        return res.redirect(pagamento.body.init_point);
    }catch(err){
        return res.send(err.message);
    }    
});

app.post("/not",(req, res) => {
    var id = req.query.id;
       
    setTimeout(() => {

        var filtro = {
            "order.id": id
        }

        MercadoPago.payment.search({
           qs: filtro 
        }).then(data => {
          var pagamento = data.body.results[0];
          console.log(data);
          if(pagamento != undefined){
            console.log(pagamento.external_reference);
            console.log(pagamento.status);
         }else{
            console.log("Pagamento não existe")
         }
      }).catch(err => {
            console.log(err);
        });

    },20000)

    res.send("ok");
});

var pollTime = 5000 ;
setInterval(async () => { 
    await ServicoAgendamento.SendNotification();
},pollTime) 

app.listen(3000, () => {});

