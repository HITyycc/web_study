var express = require('express');
var router = express.Router();
const search = require('./search.js');
router.get('/', function(req, res, next){
  var result  = {
    success: true,
    name: 'gxy'
  };
  res.send(JSON.stringify(result));
});

router.get('/search', search);
module.exports = router;
