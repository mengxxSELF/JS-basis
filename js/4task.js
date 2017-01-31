/*.myForEach封装+map封装*/

// forEach  无返回值


// 2个参数  cb  context  无返回值
Array.prototype.myForEach= function (cb,context) {
    context = context||window;
    if('forEach' in Array.prototype){
        this.forEach(cb,context);
        return;
    }
    for(var i=0,len=this.length;i<len;i++){
        cb.call(context,this[i],i,this);
    };
};

// map  2 个参数  有返回值
Array.prototype.myMap = function (cb,context) {
    context=context||window;
    if('map'in Array.prototype){
        return  this.map(cb,context);
    };
    var end =[];
    for(var i=0 ,len=this.length;i<len;i++){
        var got = cb.call(context,this[i],i,this);
        end.push(got);
    }
    return end;
};

