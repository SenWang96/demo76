$(function(){
    $('#showLogin').on('click',function(){
        $('.register_form').hide();
        $('.login_form').show();
    });
    $('#showReg').on('click',function(){
        $('.register_form').show();
        $('.login_form').hide();
    });
    // ================添加自定义校验规则=========================
    // form.verify  layui提供的用来定义校验规则
    // 注意: form.verify 不能直接去使用，需要从layui中获取到form的功能(layui.form)
    // 才可以添加
        var form = layui.form;
        form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        // 校验密码长度
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致 
        repassword : function(value){
            let pwd1 = $('#pwd1').val();
            if(pwd1 !== ""&&value !== ""&& value !== pwd1)
            {
                return "两次密码不一致"
            }
        } ,
    });
let layer = layui.layer;
    // 
     // 触发注册表单的 submit 事件
  $('#registerForm').on('submit', function(e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起请求，注册新用户
    $.post('http://api-breakingnews-web.itheima.net/api/reguser', $(this).serialize(), function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 展示登录表单
      $('#showLogin').click()
    })
  })

  // 触发登录表单的 submit 事件
  $('#loginForm').on('submit', function(e) {
    e.preventDefault()
    // 实现登录功能
    $.post('http://api-breakingnews-web.itheima.net/api/login', $(this).serialize(), function(res) {
      if (res.status !== 0) {
        // 登录失败
        return layer.msg(res.message)
      }
      layer.msg('登录成功！即将跳转到主页~~',function(){
        location.href = '/home/index.html'
      })
      // 将 token 令牌存储到客户端本地
      localStorage.setItem('token', res.token)
      console.log(res.token);
      // 跳转到后台主页
      
    })
  })
});
// 实现注册功能