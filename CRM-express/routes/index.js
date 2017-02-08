var express = require('express');
var router = express.Router();

var fs = require('fs');
var jsonPath = './public/json/custom.json'; // json�ļ�Ŀ¼
var jsonData = fs.readFileSync(jsonPath,'utf-8'); // �����������ַ��� ��ҪתΪ json����
var jsonObj = JSON.parse(jsonData); //  ���� תΪ json����
// ���صĶ���
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
    res.send(JSON.stringify(result)); // ��json�ַ�����ʽ���
  }
});
// �����û���Ϣ  ʹ�õ���post ����������
router.post('/addInfo', function (req,res) {
  console.log(req.body);
  var getData=req.body;
  getData['id'] = jsonObj.length==0?1:jsonObj[jsonObj.length-1]['id']+1 ;
  jsonObj.push(getData);
  // ����������д��
  fs.writeFileSync(jsonPath , JSON.stringify(jsonObj),'utf-8');
  result = {code:0 , mag:'success' ,data: item};
  res.send(result);
});


// ��ȡ�û�������Ϣ   ��Ҫ���ʺŴ��� ��ȡid
router.get('/getInfo', function (req,res) {
  var id = req.query['id'];
  jsonObj.forEach(function (item,index) {
    if(item.id==id){
      // ����ID ���ҵ�������Ϣ
      result = {code:0 , mag:'success' ,data: item};
      res.send(result);
    }
  });
});

// ɾ���û���Ϣ   ��Ҫ���ʺŴ��� ��ȡid
router.get('/removeInfo', function (req,res) {
  var id = req.query['id'];
  jsonObj.forEach(function (item,index) {
    if(item.id==id){
      jsonObj.splice(index,1);
      // ����д��
      fs.writeFileSync(jsonPath,JSON.stringify(jsonObj),'utf-8');
      result = {code:0 , mag:'success'};
      res.send(result);
    }
  });
});


//��Ҫ��ʽ������  ���ص��Ƕ���
function changeData(str){
  var obj={};
  var reg = /([^&]+)=([^&]+)/g;
  str.replace(reg, function ($0, $1, $2) {
    obj[$1]=$2;
  });
  return obj;
};







module.exports = router;
