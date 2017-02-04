/* 瀑布流+延迟加载+回到顶部 */
// 获取图片 渲染DOM 图片延迟加载

var aULs = document.getElementsByTagName('ul');
var aryUls = Array.prototype.slice.call(aULs);// 类数组转数组

var aImgs = document.getElementsByTagName('img');

// 1 渲染第一屏图片

var writeDom = (function (n) {
    n=n||30;
    for(var i=0;i<n;i++){
        var ran = Math.round(Math.random()*16+1);
        var str ='<li style="height: '+ran*10+'px;"  ><img data-src="imgs/'+ran+'.jpg" alt=""/></li>';
        // 将图片添加到长度最短的ul中
        aryUls.sort(function (a,b) {
            return a.offsetHeight - b.offsetHeight;
        });
        aryUls[0].innerHTML += str;
    }
    return arguments.callee;
})(20);

//图片延迟加载 [ 当滚动高度 大于图片位置 ]     更改li真实高度
var lazyImg = (function () {
    for(var i=0,len=aImgs.length;i<len;i++){
        (function (index) {
            var cur = aImgs[index];

            //var posImg = cur.offsetTop;



            var img = new Image();
            img.src= cur.getAttribute('data-src');
            img.onload= function () {
                cur.setAttribute('src',this.src);
                //更改li真实高度
                cur.parentNode.style.height = cur.offsetHeight+'px';
            };
        })(i);
    };
})();


// 下拉刷新 当滚动高度 + 屏幕高度 》 文档高度  加载新内容
window.onscroll = function () {
    var screenH =  document.documentElement.clientHeight || document.body.clientHeight ; // 屏幕高度
    var scrollT =  document.documentElement.scrollTop||document.body.scrollTop; // 滚动高度
    var docH = document.body.offsetHeight;// 文档高度
    if(docH< (scrollT+screenH )){
        writeDom();
    }
};