/* 瀑布流+延迟加载+回到顶部 */
// 获取图片 渲染DOM 图片延迟加载

var aULs = document.getElementsByTagName('ul');
var aryUls = Array.prototype.slice.call(aULs);// 类数组转数组

var aImgs = document.getElementsByTagName('img');

// 1 渲染第一屏图片
(function (n) {
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
    //图片延迟加载  更改li真实高度
    for(var i=0,len=aImgs.length;i<len;i++){
        (function (index) {
            var cur = aImgs[index];
            var img = new Image();
            img.src= cur.getAttribute('data-src');
            img.onload= function () {
                cur.setAttribute('src',this.src);
                //更改li真实高度
                cur.parentNode.style.height = cur.offsetHeight+'px';
            };
        })(i);
    };


})(30);




// 下拉刷新
