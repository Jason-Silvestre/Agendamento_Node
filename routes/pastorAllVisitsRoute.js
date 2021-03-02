const express = require("express");
const router = express.Router();
const app=express();
const ServicoAgendamento = require("../services/ServicoAgendamento");

router.get("/list", async (req, res) => {  
        var vis = await ServicoAgendamento.GetAll(true);
        res.render("list",{vis});
    });

    module.exports = router;