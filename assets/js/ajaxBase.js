// ajax的公共配置信息(根地址等就不用进行重复性填写)
$.ajaxPrefilter(function(option){
    option.url  = 'http://api-breakingnews-web.itheima.net' + option.url; 




    // 接口要求携带token信息
    if(option.url.indexOf("/my"))
    {
        option.headers = {
            Authorization:localStorage.getItem('token'),
        };
    };
    option.complete = function(xhr){
        //   console.log(this);
        if(
            xhr.responseJSON.status === 1&& xhr.responseJSON.message ==="身份认证失败！"
        ){
            location.href = '/home/login.html'
        }
      };
})