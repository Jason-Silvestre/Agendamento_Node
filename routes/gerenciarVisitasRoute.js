const express = require("express");
const router = express.Router();
const app=express();
const ServicoAgendamento = require("../services/ServicoAgendamento");


router.get("/", async (req, res) => {
    var visits = await res.render("index");   
});

module.exports = router;