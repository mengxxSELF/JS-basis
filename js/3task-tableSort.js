/* 表格排序  点击排序*/
// 获取数据 渲染页面 默认姓名排序 各行变色 点击排序

    var data =null;
    var oTable = document.getElementsByTagName('table')[0];
    var aTds= oTable.tHead.rows[0].cells;
    var oTbody = oTable.tBodies[0];
    var aTrs = oTbody.getElementsByTagName('tr');

    //1 获取数据
    (function () {
        var xhr =new XMLHttpRequest();
        xhr.open('get','./json/tableSort.txt',false);
        xhr.onreadystatechange= function () {
            if(xhr.readyState==4&&xhr.status==200){
                data= xhr.responseText;
                data =  'JSON' in window?JSON.parse(data):eval('('+data+')');
            }
        };
        xhr.send();
    })();
//    2 渲染DOM
    (function (data) {
        var str='';
        for(var i=0,len=data.length;i<len;i++){
            var cur = data[i];
            str+='<tr>\
                <td>'+cur.name+'</td>\
                <td>'+cur.age+'</td>\
                <td>'+cur.score+'</td>\
                <td>'+cur.sex+'</td>\
                </tr>'
        };
        oTbody.innerHTML = str;
    })(data);
    // 3 默认按照姓名排序  DOM 重新渲染
    forSort(0);
//  4 各行变色
    changeColor(aTrs);
//    5 点击排序
    for(var i=0;i<aTds.length;i++){
        (function (index) {
            var cur = aTds[index];
            if(index== aTds.length-1) return;// 性别不可点击
            cur.flag = -1;// 设置标志位
            cur.onclick = function () {
                cur.flag*=-1;
                // 其余标志位恢复初始值
                for(var i=0;i<aTds.length;i++){
                    if(i!=index){
                        aTds[i].flag= -1;
                    }
                };
                forSort(index);
            };
        })(i);
    };




function changeColor(obj){
    for(var i=0 ,len=obj.length;i<len;i++){
        obj[i].className= i%2==0?'event':'odd';
    }
};
// 排序 类数组转数组  sort排序  n为第几列
function forSort(n){
    var ary = Array.prototype.slice.call(aTrs); // 简单的一个转化 不兼容IE
    ary.sort(function (a,b) {
        a=a.cells[n].innerHTML;
        b=b.cells[n].innerHTML;
        return   (a-b||a.localeCompare(b))*aTds[n].flag;
    });
    //  DOM 重新渲染
    var frg = document.createDocumentFragment(); // 文档碎片
    for(var i=0,len=ary.length;i<len;i++){
        frg.appendChild(ary[i]);
    }
    oTbody.appendChild(frg);
    frg=null;
    // 各行变色
    changeColor(aTrs);
}