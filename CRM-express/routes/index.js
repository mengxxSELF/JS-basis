var express = require('express');
var router = express.Router();

var fs = require('fs');
var jsonPath = './public/json/custom.json'; // json文件目录
var jsonData = fs.readFileSync(jsonPath,'utf-8'); // 读出来的是字符串 需要转为 json对象
var jsonObj = JSON.parse(jsonData); //  数据 转为 json对象
// 返回的对象
var result = {code: 1 , msg:'error',data:null };


/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'CRM' });
});
router.get('/detail', function(req, res, next) {
  res.render('detail', { title: 'CRM-detail' });
});
router.get('/getAllList', function(req, res) {
  var data = jsonObj;
  if(data.length>=0){
    result = {code:0 , mag:'success' ,data: data};
    res.send(JSON.stringify(result)); // 以json字符串格式输出
  }
});
// 增加用户信息  使用的是post 请求来处理
router.post('/addInfo', function (req,res) {
  console.log(req.body);
  var getData=req.body;
  getData['id'] = jsonObj.length==0?1:jsonObj[jsonObj.length-1]['id']+1 ;
  jsonObj.push(getData);
  // 将数据重新写入
  fs.writeFileSync(jsonPath , JSON.stringify(jsonObj),'utf-8');
  result = {code:0 , mag:'success' ,data: item};
  res.send(result);
});


// 获取用户详情信息   需要从问号传参 获取id
router.get('/getInfo', function (req,res) {
  var id = req.query['id'];
  jsonObj.forEach(function (item,index) {
    if(item.id==id){
      // 根据ID 查找到对象信息
      result = {code:0 , mag:'success' ,data: item};
      res.send(result);
    }
  });
});

// 删除用户信息   需要从问号传参 获取id
router.get('/removeInfo', function (req,res) {
  var id = req.query['id'];
  jsonObj.forEach(function (item,index) {
    if(item.id==id){
      jsonObj.splice(index,1);
      // 重新写入
      fs.writeFileSync(jsonPath,JSON.stringify(jsonObj),'utf-8');
      result = {code:0 , mag:'success'};
      res.send(result);
    }
  });
});


//需要格式化数据  返回的是对象
function changeData(str){
  var obj={};
  var reg = /([^&]+)=([^&]+)/g;
  str.replace(reg, function ($0, $1, $2) {
    obj[$1]=$2;
  });
  return obj;
};







module.exports = router;
