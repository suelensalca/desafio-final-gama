var express = require("express");
var router = express.Router();
var db = require("../database");

router.get("/", function (req, res, next) {
  res.send("api response");
});

router.get("/candidatos", async function (req, res, next) {
  let result = {};

  try {
    result = await db.query("SELECT nome, email, cpf FROM candidatos")
  } catch (error) {
    console.log(error);
  } 

  res.send(result.rows);

});

// inserir-candidato
router.post("/inserir-candidato", async function (req, res, next) {
  const result = {
    status: 200,
    data: {}
  };

  let body = req.body;
  let queryStr = `INSERT INTO candidatos (${Object.keys(body).join(', ')}) VALUES (${Object.values(body).map((value) => `'${value}'` ).join(', ')})`

  try {
    await db.query(queryStr)
    result.data = body
  } catch (error) {
    result.status = 500;
    result.data = error;
  } 

  res.status(result.status).send(result);

});


module.exports = router;
