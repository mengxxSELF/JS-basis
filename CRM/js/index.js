/* 首页模块的相关操作  使用单例模式 */
// 获取所有用户信息  ajax
var oBody = document.getElementsByTagName('tbody')[0];


var indexRender= (function () {
    // 数据绑定
    function bindData(data){
        var str='';
        for(var i=0 ,len = data.length ;i<len;i++){
            var cur= data[i];
            str+= '<tr>\
                <td>'+cur.id+'</td>\
                <td>'+cur.name+'</td>\
                <td>\
                <button class="btn btn-info"><a href="../detail.html?id='+cur.id+'">修改</a></button>\
                <button class="btn btn-default"  data-id="'+cur.id+'">删除</button>\
                </td>\
                </tr>';
        }
        oBody.innerHTML = str;
    }
    // 删除用户
    function deleteInfo(){
        // 使用事件委托
        oBody.onclick= function (e) {
            e=e||window.event;
            e.target= e.target||e.srcElement;
            var tagName = e.target.tagName.toLowerCase();
            var dataId=e.target.getAttribute('data-id');
            if( tagName=='button' &&　e.target.innerHTML=='删除' ){
                //     确认提示框
                var flag = confirm('确认删除编号为'+dataId+'吗?');
                if(!flag) return;
                // 删除
                ajax('/removeInfo',{
                    data:{
                        id:dataId
                    },
                    cache:false,// 清除缓存
                    success: function (res) {
                        if(res.code==0){
                            alert('删除成功');
                            // 页面刷新
                           // window.location.href=window.location.href;
                        //    或者前端移除li
                            oBody.removeChild(e.target.parentNode.parentNode)
                        }
                    }
                });



            }
        }
    }
    return {
        /*  */
        init: function () {
            ajax('/getAllList',{
                cache:false,
                success: function (result) {
                    //console.log(result);
                    if( !result || result.code!==0) return;
                    // 数据渲染 字符串拼接方式
                    var data = result.data;
                    bindData(data);
                    //删除操作也要在获取数据之后
                    deleteInfo();
                }
            }); // 清除缓存
        },

    };
})();
indexRender.init();