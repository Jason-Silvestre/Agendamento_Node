const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const models=require('../models');
const app=express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//conexão mercado pago
const MercadoPago = require("mercadopago");
MercadoPago.configure({
    sandbox: true,
    access_token:"TEST-8069843486273788-012219-d8b9c8aac4ab8a3f4c5b3a925687104c-148888633"
}); 

let user=models.User; 

//modulo financeiro
//rotas do mercado pago
router.get("/doacoes", (req, res) => {
    res.send(" Dizimos e ofertas no cartão de credito! " + Date.now());
});

//transferir mercado pago cartão de crédito
router.get("/transferir",async (req, res) => {

//banco de dados falso
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



router.post("/not",(req, res) => {
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

module.exports = router;