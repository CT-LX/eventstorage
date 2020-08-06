$(function () {
    // 初始化渲染页面---封装  
    // 美化时间,通过 template.defaults.imports 定义过滤器
    // 实现筛选功能---获取下拉框value值
    // 分页功能---分页的回调，死循环解决
    // 编辑功能
    // 删除功能---删除最后一个的时候，前一页请求数据



    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    }
    // 获取列表数据,渲染初始化页面
    initlistpage()

    // 处理时间格式,补零
    function padZero(n) {
        return n > 9 ? n : "0" + n
    }

    //    通过 template.defaults.imports 定义过滤器
    template.defaults.imports.datefilter = function (time) {
        var data = new Date(time);
        var y = padZero(data.getFullYear());
        var m = padZero(data.getMonth() + 1);
        var d = padZero(data.getDate());

        var hh = padZero(data.getHours());
        var mm = padZero(data.getMinutes());
        var ss = padZero(data.getSeconds());

        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss

    }

    // 实现筛选功能---获取参数，给对象q，传参数，重新发起ajax请求
    $(".shaixuan").on("click", function () {
        var cate = $("#select-list").val();
        var state = $(".states").val();
        // console.log(cate,state)
        // 给对象q传参
        q.cate_id = cate;
        q.state = state;
        // 调用初始化init函数
        initlistpage();
    })


    // 定义渲染分页的方法-----------------------------------------
    function renderpage(total) {
        //执行一个laypage实例
        layui.laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum,// 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'next', 'page', 'skip'],
            limits: [2, 3, 5, 10],

            // 分页发生切换的时候，触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                // console.log(first)
                // console.log(obj.curr)
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                // initTable()
                if (!first) {
                    initlistpage()
                }

            }

        });

    }


    // 实现删除功能---删除最后一项，需要判断是否需要跳转到前一个分页
    $("tbody").on("click", ".delbtn", function () {
        var id = $(this).attr("data-id")
        // 判断还有几个未删除
        var len = $(".delbtn").length;
        // console.log(id)
        // 询问
        layui.layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: "/my/article/delete/" + id,
                type: "get",
                success: function (res) {
                    // console.log(res)
                    if (res.status != 0) {
                        layui.layer.msg(res.message)
                    }
                    // 删除成功，重新加载页面
                    layui.layer.msg(res.message)


                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了,则让页码值 -1 之后,
                    // 再重新调用 initlistpage 方法
                    console.log(len)//点击时的个数，
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }



                    initlistpage()
                }
            })
            layer.close(index);
        });

    })


    // 实现编辑功能---根据id获取数据，加载默认数据，再重新发布
    $("tbody").on("click", ".editlists", function () {
        var id = $(this).attr("data-id")
        // console.log(id)
        location.href = "./edit.html?id" + id
        // console.log()

    })





    function initlistpage() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户列表失败！")
                }
                // template 分类列表模板
                var html = template("tpl-table", res)
                $("tbody").html(html)

                // input所有分类列表
                var selet = template("articlisteach", res)
                $("#select-list").html(selet)
                // 调用render方法更新渲染
                layui.form.render(); //更新全部
                // 调用渲染分页的方法
                renderpage(res.total)

            }
        })

    }





















    // end

})