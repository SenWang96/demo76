$(function(){
    let layer = layui.layer;
    // 获取当前分类，进行渲染
    // -1 
    function getCata(){
        // 
        // let 
        $.ajax({
            url:'/my/article/cates',
            success: function(res){
               if(res.status === 0){
                let htmlStr = template('tplCata',res);
                // 将模板引擎生成的代码添加进相对应的位置
                $('.cata_tb').html(htmlStr);
               }
            }
        })
    }
    getCata();
    // -----------------渲染成功
        // 分类分页组件
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        
        //执行一个laypage实例
        laypage.render({
             elem: 'list_paging' //注意，这里的 test1 是 ID，不用加 # 号
            ,count: 50 //数据总数，从服务端得到
        });
    });

    // 添加类别
    //  -1 open弹框 -2 点击按钮提交数据 -3 渲染数据 
    var addIndex = null;
    function cataOpen(target,title){
        addIndex =  layer.open({
            content:$(target).html(),
            title:title,
            type:1,
            anim:0,
            area: ['480px', '280px'],
            resize:false,
            move:false,
            success: function(){
                // 弹出层成功后进行提交操作
                
            }
        })
    }
    $("#addCata").on("click",function(){
        //弹框进行添加
        cataOpen('#addCatagory' ,'添加文章分类');
    })

    //添加类别发送ajax，清空弹框，并清空弹框
    addCata('.addCatagory','/my/article/addcates');
      function addCata(classTyoe,url){
            $('body').on('submit',classTyoe,function(e){
            console.log('addIndex=',addIndex);
            e.preventDefault();
            // 取得添加的分类数据
            let data = $(this).serialize();
            $.ajax({
                type:"POST",
                url,
                data,
                success:function(res){
                    if(res.status !== 0){
                    console.log(res);
                        if(classType === '.addCatagory'){
                            return layer.msg("新增失败");
                        }else if(classType=== '.editCatagory'){
                            return layer.msg("修改失败")
                        }
                    }
                    layer.close(addIndex);
                    getCata();
                },
            });
        });  
      }

    // 编辑分类
    $('body').on('click','.cata_edit' , function(){
        let id = $(this).attr('data-id');
        //弹出编辑框 
        cataOpen('#editCatagory' ,'修改文章分类');
        var data;
        // 填充自身的信息，以便进行修改
        $.get('/my/article/cates/'+id,
        // 调用服务器成功后的回调函数
            function(res){
                console.log(res.data);
                data = res.data;
                $('.editCatagory [name="Id"]').val(data.Id);
                $('.editCatagory [name="name"]').val(data.name);
                $('.editCatagory [name="alias"]').val(data.alias);
                // ditCata(id);
            }
        )
         // 编辑框的重置功能 
        //  let formDt = new FormData($('.editCatagory')[0]);
        $('body').on('click','.reset-cata',function(){
            $('.editCatagory [name="Id"]').val(data.Id);
            $('.editCatagory [name="name"]').val(data.name);
            $('.editCatagory [name="alias"]').val(data.alias);
        })

    })
    // 触发点击事件，发送ajax请求   
    addCata('.editCatagory','/my/article/updatecate');

 // 删除分类
    $("tbody").on("click",'.cata_del',function(){
       // 删除原理:根据Id删除文章分类
        console.log($(this).attr('data-id'));
        let Id = $(this).attr('data-id');
        layer.confirm('确定删除？',{icon:3,title:'标题'},function(index){
        // 发送ajax请求
            $.ajax({
                url:'/my/article/deletecate/'+Id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg("删除失败了哦哦哦哦");
                    }
                    getCata();
                    layer.msg("文章删除成功了呢")  
                }
            })
            layer.close(index)
        })
    })


})