$(function(){
    let layer = layui.layer;
    let form = layui.form;
    // 获取文章类别
    $.ajax({
        url:'/my/article/cates',
        success: function(res){
            if(res.status === 0){
                
                let data = res.data;
                data.forEach(val => {
                    $('#all_categories').append(`<option value=${val.Id}>${val.name}</option>`)
                });
                form.render();
            }

        }
    })

    // 富文本编辑器放置
    // 初始化富文本
    // 初始化富文本编辑器
    initEditor()
    // 美化
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 4/3,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
})