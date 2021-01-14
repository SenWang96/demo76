$(function(){
    // 校验规则
    let layer = layui.layer;
    let form = layui.form;
    form.verify({
        pwd:[
            /[\S]{6,12}$/,"密码必须6-12位,且不能出现空格"
        ],
        
        pwd1:function(val,item){
                let pwd = $("[name='oldPwd']").val();
                if(pwd!==""&&val!==""&&val=== pwd){
                return "与初始密码一致";    
                }
            },
        pwd2: function(val,item){
            let pwd1 = $("[name='newPwd']").val();
            if(pwd1!==""&&val!==""&&pwd1!==val){
                return "两次输入的新密码不一致"
            }
        }
            
    });

    // 提交信息修改密码
   $("#resetPwd").on("submit",function(e){
    //    阻止默认跳转事件
    e.preventDefault();
    // 获取form的信息
    let data = $(this).serialize();
    // 发送ajax请求，提交要修改的数据
    let that = this;
    $.ajax({
        data,
        url:"/my/updatepwd",
        type:"POST",
        success: function(res){
                if(res.status!==0){
                    return layer.msg("密码修改错误~~~您输入的原密码有误~~")
                }
                layer.msg("跟新密码成功~~");
                // 更新成功之后重置表单
               that.reset();

        }
    })

   })
   
})