var express = require('express');
const url = require('url');
const urlencode = require('urlencode');
const qs = require('querystring');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '',
  database: 'company'
});
connection.connect();
var router = express.Router();
router.get('/getdata',function(req, res, next){
  var qsdata = url.parse(req.url).query;
  var flag = 0;
  console.log(url.parse(req.url));
  var sql = 'select * from employee';
  if(qsdata != ''){
    qsdata = qs.parse(qsdata);
    sql += ' where';
    for(var key in qsdata){
      if(flag === 1){
        sql += ' and';
      }
      flag = 1;
      if(key == 'address'){
        sql += ` ${key} like '%${qsdata[key]}%'`
      }else{
        sql += ` ${key} = '${qsdata[key]}'`;
      }
    }
  }
  sql += ';';
  console.log(sql);
  connection.query(sql, (err, results, fields) => {
    if(err){
      res.send(JSON.stringify({success:0, text:"获取数据失败"}));
    }else{
      res.send(JSON.stringify({success:1, results}));
    }
  });
})


router.get('/delete', function(req, res, next){
  var qsdata = url.parse(req.url).query;
  if(qsdata === null){
    res.send(JSON.stringify({success:0, text:"需要指明essn"}));
    return;
  }
  qsdata = qs.parse(qsdata);
  if(qsdata.essn == null){
    res.send(JSON.stringify({success:0, text:"需要指定essn"}));
    return;
  }
  var sql = `delete from employee where essn = '${qsdata.essn}'`;
  console.log(sql);
  connection.query(sql,  (err, results, fields) => {
    if(err){
      res.send(JSON.stringify({success:0, text:"删除失败"}));
    }else{
      res.send(JSON.stringify({success:1, text:"删除成功"}));
    }
  });
})



router.get('/update', (req, res, next) =>{
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `update employee set`;
  var flag = 0;
  for(var key in qsdata){
    if(flag == 0){
      sql += ` ${key} = '${qsdata[key]}'`;
      flag = 1;
    }else{
      sql += `, ${key} = '${qsdata[key]}'`;
    }
  }
  sql += `where essn = '${qsdata.essn}'`;
  console.log(sql);
  connection.query(sql,  (err, results, fields) => {
    if(err){
      res.send(JSON.stringify({success:0, text:"更新失败"}));
    }else{
      res.send(JSON.stringify({success:1, text:"更新成功"}));
    }
  });
})

router.get('/add', (req, res, next) =>{
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `insert into employee `;
  var flag = 0;
  var keystr = '';
  var keyvalue = '';
  for(var key in qsdata){
    if(flag == 0){
      keystr += ` (${key}`;
      keyvalue += ` ('${qsdata[key]}'`;
      flag = 1;
    }else{
      keystr += ` ,${key}`;
      keyvalue += ` ,'${qsdata[key]}'`;
    }
  }
  keystr += ')';
  keyvalue += ')';
  sql += keystr + ' values ' + keyvalue + ';';
  console.log(sql);
  connection.query(sql,  (err, results, fields) => {
    if(err){
      res.send(JSON.stringify({success:0, text:"添加失败"}));
    }else{
      res.send(JSON.stringify({success:1, text:"添加成功"}));
    }
  });
})
module.exports = router;
