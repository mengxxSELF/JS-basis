/* 数组去重  */
var ary =[2,3,2,3,2,6,8,4,3,9,5,3,5];

/* 1 最简单是是使用es6 中的set */

var end1 = new Set(ary);
console.log(end1); // 2368495

/* 2  使用indexOf */
var end2=[];
for(var i=0 ,len=ary.length;i<len;i++){
    if(end2.indexOf(ary[i])==-1){
        end2.push(ary[i]);
    }
}
console.log(end2); // 2368495

/* 3 利用对象属性不重名特性*/
var obj={};
for(var i=0 ,len=ary.length;i<len;i++){
    obj[ary[i]]=ary[i];
};
var end3=[];
for(var attr in obj){
    end3.push(Number(attr));
}
console.log(end3); // 2368495



