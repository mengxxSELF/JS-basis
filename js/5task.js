/*求平均值*/
// 减去最大最小值 求平均值

function avg(){
    arguments.__proto__ = Array.prototype;
    arguments.sort();
    arguments.pop();
    arguments.shift();
    var all = 0;
    for(var i=0 ,len=arguments.length;i<len;i++){
        var cur = arguments[i];
        if( !isNaN(parseFloat(cur)) ){
            all+= parseFloat(cur);
        }
    }
    return (all/len).toFixed(2);
}
console.log(avg(1,2,3,4));