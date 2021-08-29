var express = require("express");
var router = express.Router();
var db = require("../database");

router.get("/candidatos", async function (req, res, next) {
/* 	#swagger.tags = ['Candidatos']
  #swagger.description = 'Endpoint para listar candidatos cadastrados' */

  const result = {
    status: 200,
    data: {}
  };

  try {
    let data = await db.query("SELECT nome, email FROM candidatos");
    result.data = data.rows;
  } catch (error) {
    console.log(error);
    result.status = 401;
    result.data = error;
  }

/* #swagger.responses[200] = { 
      schema: { $ref: "#/definitions/ListaCandidato" },
      description: 'Candidatos encontrados.' 
} */

res.status(result.status).send(result);

});

// inserir-candidato
router.post("/inserir-candidato", async function (req, res, next) {
/* 	#swagger.tags = ['Candidatos']
    #swagger.description = 'Endpoint para cadastro de candidatos' */

/*	#swagger.parameters['obj'] = {
        in: 'body',
        description: 'Cadastro de candidatos',
        required: true,
        schema: { $ref: "#/definitions/Candidato" }
} */

/* #swagger.security = [{
        "apiKeyAuth": []
}] */

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
    result.status = 401;
    result.data = error;
  }

  res.status(result.status).send(result);

});


module.exports = router;
