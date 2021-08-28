var express = require("express");
var router = express.Router();
var db = require("../database");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("api response");
});

router.get("/teste", async function (req, res, next) {
  let sqlRes = {};

  try {
    sqlRes = await db.query("SELECT nome, email FROM candidatos")
  } catch (error) {
    console.log(error);
  } 

  res.send(sqlRes.rows);

});

module.exports = router;
