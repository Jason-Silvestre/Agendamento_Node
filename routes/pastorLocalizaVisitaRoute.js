const express = require("express");
const router = express.Router();
const app=express();
const ServicoAgendamento = require("../services/ServicoAgendamento");

router.get("/searchresult", async (req, res) => {
    var vis = await ServicoAgendamento.Search(req.query.search);
     res.render("list",{vis});
 });

 module.exports = router;