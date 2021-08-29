var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let html = `
  <html>
    <head>
      <title>Env Vars</title>
    </head>
    <body>
        ${'<p>'+process.env.BASE_URL+'</p>'}
        ${'<p>'+process.env.DATABASE_HOST+'</p>'}
        ${'<p>'+process.env.ENVIRONMENT+'</p>'}
    </body>
    </html>
`;

  res.send(html);
});

module.exports = router;
