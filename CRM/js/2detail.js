/* 详情页 */
// 判断页面URL 是否有ID  有 为修改 没有就是添加新用户

var submit = document.getElementById('submit');
var username = document.getElementById('userName');


var detailRender = (function () {

    // 处理URL参数
    String.prototype.getUrl = function () {
        var obj={};
        var reg = /([^=&?#]+)=([^=&?#]+)/g;
        this.replace(reg, function ($0,$1,$2) {
            obj[$1]=$2;
        });
        return obj;
    };



    function init(){
        // 判断页面url
        var url = window.location.href;
        var urlObj = url.getUrl();
        if(urlObj['id']){
            // 如果有id  先获取信息
            ajax('/getInfo?id='+urlObj['id'],{
                success: function (res) {
                    if(res && res.code==0){
                        username.value = res.data.name;
                    }
                }
            });

        }else{
            // 如果没有id

        };
        submit.onclick = function () {
            var value = username.value;
            var id = urlObj['id'];

            if(value.length==0){
                alert('输入为空')
                return;
            }

            if(typeof id!= 'undefined'){
                // 如果有ID  修改用户信息
                ajax('/updateInfo',{
                    method:'post',
                    data:{
                        id:id,
                        name:value
                    },
                    success: function (res) {
                        if(res && res.code==0){
                            alert('修改成功')
                            window.location.href='index.html';
                        }else{
                            alert('修改失败')
                        }
                    }
                })
            }else{
                // 如果没有ID  添加用户
                ajax('/addInfo',{
                    method:'POST',
                    data:{
                        name:value
                    },
                    success: function (res) {
                        // 跳转页面
                        window.location.href= 'index.html';
                    }
                })
            }
        };
    };
    return {
        init:init
    };
})();

detailRender.init();