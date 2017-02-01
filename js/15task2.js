/* 图片跑马灯 */
// 思路2   追加ul 开启定时器 移动ul
(function () {
    var oBox = document.getElementsByTagName('div')[0];
    var oUl = document.getElementsByTagName('ul')[0];
    var aImgs = document.getElementsByTagName('img');
    var oImg = document.getElementsByTagName('img')[0];

/* 追加ul*/
    oUl.innerHTML += oUl.innerHTML;

    var widthUl = oUl.offsetWidth; // ul宽度
    var widthImg = oImg.offsetWidth; // 图片宽度
    var timer = null;


    function moving(){
        var move = parseInt(getComputedStyle(oUl,null)['left']);
        move--;
        if( Math.abs(move)>= widthUl/2 ) {
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