const express = require("express");
const router = express.Router();
const app=express();
const ServicoAgendamento = require("../services/ServicoAgendamento");


router.get("/getcalendar" , async (req, res) => {
    var visits = await ServicoAgendamento.GetAll(false);
    res.json(visits);
});

  
module.exports = router;