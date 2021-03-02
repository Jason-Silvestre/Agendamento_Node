const express = require("express");
const router = express.Router();
const app=express();
const ServicoAgendamento = require("../services/ServicoAgendamento");

router.post("/finish", async (req, res) => {
    var id = req.body.id;
    var result = await ServicoAgendamento.Finish(id);
    res.redirect("/");
});

module.exports = router;
