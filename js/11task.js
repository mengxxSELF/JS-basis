/* 99乘法表*/

~function () {
    var oUl = document.getElementsByTagName('ul')[0];
    var alis = document.getElementsByTagName('li');
    var str ='';
    for(var i=1;i<10;i++){
        str +='<li>';
        for(var j=1;j<i;j++){
            str +='<span>'+j+'x'+i+'='+(j*i)+'</span>';
        }
        str +='</li>';
    }
    oUl.innerHTML = str;
    // 各行变色
    for(var i=0 ,len=alis.length;i<len;i++){
        alis[i].className= i%2==0?'event':'odd'
    };

}();