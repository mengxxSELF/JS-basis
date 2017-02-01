/*倒计时*/

(function () {
    var oDiv = document.getElementsByTagName('b')[0];

    setInterval(function () {
        var date = new Date();
        var dur1 = date.getTime(); // 当前时间距离1970的毫秒差。
        var dur2 = new Date('2017/2/4').getTime(); // 开学时间距离1970的毫秒差。
        var allSecond = Math.floor((dur2-dur1)/1000);// 间隔秒数

        var allHours = Math.floor( allSecond/3600 ); // 间隔小时
        var allMinute = Math.floor( (allSecond%3600)/60 ); // 间隔分钟
        var allSeconds = Math.floor( (allSecond%3600)%60 ); // 间隔秒
        oDiv.innerHTML = tT(allHours)+':'+tT(allMinute)+':'+tT(allSeconds);
    },1000);
    // 时间补位函数
    function tT(time){
        return time<10?'0'+time:time;
    }
})();