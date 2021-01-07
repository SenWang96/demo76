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
      let form = layui.form;
      form.verify ({
        pass:[/^[\S]{6,12}$/,'密码必须6位-12位，且不能出现空格'],
        repassword:function(val){
          // 两次密码要一直
          let pass = $('#pwd1').val();
          let pasw = $("[type = 'password'");
          console.log(pasw);//对象
          console.log(pasw[0],pasw[1],pasw[2],pasw.eq(1).val(),val);
          if(pass !== ''&&val !== ''&& pass !== val)
           { return '两次密码不一致'}
        }
      })

    let layer = layui.layer;
    // 
     // 触发注册表单的 submit 事件
    $('#registerForm').on('submit',function(e){
      // 阻止表单的默认提交事件
      e.preventDefault();
      let data = $(this).serialize();
      // 发起aja请求
      $.ajax({
        type: "POST",
        url : '/api/reguser',
        data,
        success: function(res){
            // return layer.meg(res)
            if(res.status !== 0){
              return layer.msg('注册失败')
            }
              layer.msg('注册成功',function(){
                location.href = 'http://baidu.com';
              })
        }
      
      })
    })

    // 触发登录表单的submit事件
    $('#loginForm').on('submit',function(e){
      // 阻止表单的默认提交事件
      e.preventDefault();
      let data = $(this).serialize();
      // 发起ajax请求
      $.ajax({
        type:"POST",
        url : "/api/login",
        data,
        success : function(res){
          if(res.status !== 0) {
            return layer.msg('用户名或者密码错误');
          }
            layer.msg('登录成功了,正在跳转到首页~',function(){
              location.href = '/home/index.html'
          });
          // console.log(res);
          // console.log(res.token);
          // console.log(JSON.stringify(res.token),res.token);
          localStorage.setItem('token',res.token)
          // console.log(localStorage.getItem('token'));
        }
      })

    })

  // $('#registerForm').on('submit', function(e) {
  //   // 阻止表单的默认提交行为
  //   e.preventDefault()
  //   // 发起请求，注册新用户
  //   $.post('http://api-breakingnews-web.itheima.net/api/reguser', $(this).serialize(), function(res) {
  //     if (res.status !== 0) {
  //       return layer.msg(res.message)
  //     }
  //     layer.msg('注册成功，请登录！')
  //     // 展示登录表单
  //     $('#showLogin').click()
  //   })
  // })

  // 触发登录表单的 submit 事件
  // $('#loginForm').on('submit', function(e) {
  //   e.preventDefault()
  //   // 实现登录功能
    
  //   $.post('http://api-breakingnews-web.itheima.net/api/login', $(this).serialize(), function(res) {
  //     if (res.status !== 0) {
  //       // 登录失败
  //       return layer.msg(res.message)
  //     }
  //     layer.msg('登录成功！即将跳转到主页~~',function(){
  //       location.href = '/home/index.html'
  //     })
  //     // 将 token 令牌存储到客户端本地
  //     localStorage.setItem('token', res.token)
  //     console.log(res.token);
  //     // 跳转到后台主页
      
  //   })
  // })
});
// 实现注册功能