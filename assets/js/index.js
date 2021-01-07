// index
// 全局变量，加载头像，用户名信息
let layer = layui.layer ; 

function getUserinfo(){
    $.ajax({
        url : '/my/userinfo',
        // headers: {
        //     // 接口要求携带token信息
        //     Authorization:localStorage.getItem('token'),
        // },
        success: function(res){
         
            if(res.status === 0){

                renderInfo(res)
            }else{
                
            }
            // 将所有的渲染代码放到专门的渲染函数中，让代码结构更加清晰化
            // console.log(res);
        },
    //   complete:function(xhr){
    //     //   console.log(this);
    //     if(
    //         xhr.responseJSON.status === 1&& xhr.responseJSON.message ==="身份认证失败！"
    //     ){
    //         location.href = '/home/login.html'
    //     }
    //   }
    })
} 
getUserinfo();

function renderInfo(res){
    if(res.status === 0){
        // 获取需要渲染的真实用户名
        let data = res.data;
        let name = data.nickname || data.username;
        //渲染用户名或者昵称
        $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`) ;
        // 获取头像并渲染头像
        // 判断用户是否有自定义头像
        if(data.user_pic){
            // 隐藏文字头像
            $(".text-avatar").hide();
            // 显示真实头像
            $('.layui-nav-img').show().attr('src',data.user_pic)
        }
    }
}



// 退出登录
$("#logout").click(function(){
    layer.confirm('确定退出吗？',{icon:3,title:'提示'},function(index){
        // 清除token
        // console.log(this);
        // console.log(index);
        localStorage.removeItem('token');
        // 跳转到登录界面
        location.href = '/home/login.html';
        // 
        layer.close(index)
    })
})
// 退出登录实现成功

// 控制访问权限
