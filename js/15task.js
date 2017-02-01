/* 图片跑马灯 */
// 开启定时器 移动ul  当移动到最后一张 迅速撤回到0
(function () {
    var oBox = document.getElementsByTagName('div')[0];
    var oUl = document.getElementsByTagName('ul')[0];
    var aImgs = document.getElementsByTagName('img');
    var oImg = document.getElementsByTagName('img')[0];
    var widthUl = oImg.offsetWidth*aImgs.length; // ul宽度
    var widthImg = oImg.offsetWidth; // 图片宽度
    var timer = null;
    function moving(){
        var move = parseInt(getComputedStyle(oUl,null)['left']);
        move--;
        if( Math.abs(move)>= widthImg  ) {
            move=0;
        }
        oUl.style.left = move+'px';
    }

    clearInterval(timer);
    timer = setInterval(moving,10);
    oBox.onmouseenter = function () {
        clearInterval(timer);
    };
    oBox.onmouseleave= function () {
        timer = setInterval(moving,10);
    };
})();