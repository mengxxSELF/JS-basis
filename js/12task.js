/* 获取四个不重复的随机验证码*/

var oDiv =document.getElementsByTagName('div')[0];
var oBtn =document.getElementsByTagName('div')[1];
var oMax =document.getElementsByClassName('max')[0];
var oMin =document.getElementsByClassName('min')[0];
getRan(10,50);
oBtn.onclick = function () {
    var max = oMax.value||50;
    var min = oMin.value||10;
    getRan(min,max);
};
function getRan(n,m){
    var ary =[];
    while(ary.length<4){
        var ran = Math.round(Math.random()*(m-n)+n);
        // 防止重复
        if(ary.indexOf(ran)==-1){
            ary.push(ran);
        }
    }
    oDiv.innerHTML = ary.join(',');
}