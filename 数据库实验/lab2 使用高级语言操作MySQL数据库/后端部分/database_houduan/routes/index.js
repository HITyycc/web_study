var express = require('express');
const url = require('url');
const urlencode = require('urlencode');
const qs = require('querystring');
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'hwc990428',
  database: 'company'
});
var router = express.Router();

/* GET home page. */
router.get('/q1', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select e1.essn as essn from employee e1, employee e2 where e1.superssn = e2.essn and e2.ename = '${qsdata.ename}';`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

router.get('/q2', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select dname from project natural join department where plocation = '${qsdata.plocation}';`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

router.get('/q3', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select ename, address from employee EM, works_on WO, project PJ where\
  EM.essn = WO.essn and WO.pno = PJ.pno and PJ.pname = '${qsdata.pname}';`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

router.get('/q4', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  console.log(qsdata);
  var sql = `select e1.ename as ename, e1.address as address from employee e1, employee e2\
  where e1.superssn = e2.essn and e2.address like '%${qsdata.address}%' and e1.salary > '${qsdata.salary}';`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

router.get('/q5', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select ename from employee where essn not in \
  (select essn from works_on where pno = '${qsdata.pno}');`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});


router.get('/q6', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select dname from department where mgrstartdate > '${qsdata.mgrstartdate}';`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

router.get('/q7', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select pname from project natural join works_on group by pname having sum(hours) > ${qsdata.hours};`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

router.get('/q8', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select pname from project natural join works_on group by pname having avg(hours) < ${qsdata.hours};`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

router.get('/q9', function(req, res, next) {
  var qsdata = url.parse(req.url).query;
  qsdata = qs.parse(qsdata);
  var sql = `select ename from employee where essn in \
  (select essn from works_on group by essn having sum(hours) > ${qsdata.hours}\
  and count(pno) >= ${qsdata.n} );`;
  console.log(sql);
  connection.query(sql, function(err, results, fields){
    if(err) {
      res.send(JSON.stringify({success: 0, text:'search error'}));
      return;}
    else{
      res.send(JSON.stringify({success:1,results}));
    }
  })
});

module.exports = router;
