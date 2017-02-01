/* 任意数求和*/

function add(){
    var arg = arguments;
    var total =0;
    for(var i=0,len=arg.length;i<len;i++){
        var cur = arg[i];
        if(!isNaN(Number(cur))){
            total+=cur;
        }
    };
    return total;
}
console.log(add(2,4,1,5));