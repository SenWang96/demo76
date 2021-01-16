$(function(){
    // 初始化数据，将要传送的数据
    let query = {
        pagenum:1,//默认加载第一个数据,页码值
        pagesize:2,//每页显示多少条数据
        cate_id:'',//文章分类 Id ,字符串为空，意味着要找服务器里的所有数据
        state:'', // 文章的状态 : 已发布，草稿 ；字符串为空表示为查找所有字符串的状态
    };
    let layer = layui.layer;
    let form = layui.form;
    var laypage = layui.laypage;
    //获取分类 
    function getCatrgory(){
        $.ajax({
            url:'/my/article/cates',
            success:function(res){
                renderOption(res.data);
            }
        })
    }
    getCatrgory();
    // 渲染分类
        function renderOption(data){
            // console.log(data);
           data.forEach((val) => {
            //    console.log(val);
            $(`<option value="${val.Id}">${val.name}</option>`).appendTo('#all_categories')
               
           });
        //  使用layui的内置方法，让渲染成功的分类，再次渲染到优化后的select中去
           form.render();
        }

        //筛选功能实现 

    $('#query_art').on('submit',function(e){
       e.preventDefault();
       query.cate_id = $('#all_categories').val();
       query.state = $("#all_state").val();
    //    console.log(query);
    setList();
    })

        // 补零操作
    
    let addZero = n=>n>10?n:'0'+n;
       
// 时间格式化
        template.defaults.imports.fn = function(msg){
            let date = new Date(msg);
            let years = date.getFullYear();
            let month = addZero(date.getMonth()+1);
            let day = addZero(date.getDate());
            let  h = addZero(date.getHours());
            let  m = addZero(date.getMinutes());
            let  s = addZero(date.getSeconds());

          return `${years}-${month}-${day} ${h}:${m}:${s}`

            
        }
    // 渲染文章列表
    // 渲染文章列表函数
    function randerAtrList (res){
        let htmlStr = template('tpl',res);
        $('.layui-table tbody').html(htmlStr);
    }
       function setList(){
        $.ajax({
            url:'/my/article/list',
            data:query,
            success:function(res){
                layui.use('laypage', setPaging(res.total));
            randerAtrList(res);
            // console.log("data数据的长度"+res.data.length);
            }
        })
        }
        setList();

    // 分页操作
    function setPaging(total){
            //执行一个laypage实例
            laypage.render({
              elem: 'art_paging', //注意，这里的 test1 是 ID，不用加 # 号
              count: total ,//数据总数，从服务端得到
              limit :query.pagesize,
              curr:query.pagenum,
              jump:function(obj,first){
                  console.log(obj.curr);
                    query.pagenum = obj.curr;
                    query.pagesize = obj.limit;
                    if(!first){
                        setList();
                    }

              },
              layout:['count','prev', 'page', 'next','limit','refresh','skip'],
              limits:[2,5,10,20],
            //   groups: 3,
             })
    }
    $('.queryinfo').on("click",function(){
        console.log(query);
    })
    // 注册点击事件，完成文章删除
    $('.layui-table tbody').on('click','.art_del',function(e){
        // console.log($(this).attr('data-id'));
        e.preventDefault();
        let id = $(this).attr('data-id');
        layer.confirm("确定删除吗",{icon:3,title:'提示'},function(index){
            $.ajax({
                url:'/my/article/delete/'+id,
                success:function(res){
                    // console.log(res);
                    if(res.status === 0){
                        console.log(query.pagenum);
                        console.log($('.art_del'));
                        // if()
                    }else{
                        layer.msg('删除失败')
                    }
                }
            })
            layer.close(index);

        })

    })
})