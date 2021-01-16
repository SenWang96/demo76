$(function(){
    // import '/assets/js/index.js';
    // 初始化一些配置
    let form = layui.form;
    let layer = layui.layer;
    // 发送ajax请求，获取基本信息，渲染基本信息页面
    function setInfo(data){
        // $('#username').val(data.username);
        // $('#nickname').val(data.nickname);
        // $('#email').val(data.email);

        // 代码优化
        form.val('user',data);
    }
    //获取基本信息
    function getInfo(params){
        $.ajax({
            url:'/my/userinfo',
            // headers在公共配置项里进行描述了
            success : function(res){
                setInfo(res.data);;
            }
        })
    }
    getInfo();

    //重置功能 
    $("#reset").on('click',function(){
        getInfo();
    })
// 申明拓展函数
    
// // 
    // 注册表单提交事件
    $('form').on('submit',function(e){
        // console.log('haha');
        // 阻止表单默认跳转行为
        e.preventDefault();
        // 获取表单数据
        let data = $(this).serialize();
        // let fd =new FormData(this)
        // 提交form表单

        $.ajax({
            type: "POST",
            url:"/my/userinfo",
            data,
            success : function(res){
               if(res.status===0){
                // renderInfo(res)
                window.parent.getUserinfo();
               }
            },
            
        })
        window.parent.getUserinfo();

    })
})