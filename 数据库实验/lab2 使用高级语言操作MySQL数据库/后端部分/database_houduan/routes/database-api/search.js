const mysql = require('mysql');
const qs = require('querystring');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'company'
});

connection.connect();
search = function(req, res, next){
  var qstring = req.url.split('?')[1];
  var flag = true;
  qstring = qs.parse(qstring);
  console.log(qstring);
  var sql = 'SELECT * FROM employee WHERE';
  for(var key in qstring){
    if(flag){
      sql += ' ' + key + ' = ' + qstring[key];
      flag = false;
    }else{
      sql += ' and ' + key + ' = ' + qstring[key];
    }
  }
  sql += ';';
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify(results[0]));
    }
  })
  console.log(sql);
  connection.end();
};

module.exports = search;
