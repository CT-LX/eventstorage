$(function () {
    //1. 请求数据，渲染页面,
    initcatagory()
    var indexaddinput = null;
    // 2.实现添加功能---事件委托
    $("body").on("click", ".addcategory", function () {
        // alert(1)
        // layui的弹出层---  content里面的内容可以获取 script的type='text/html'的内容（表单输入框、按钮）---（弹出层的type属性取消确定按钮）
        indexaddinput = layer.open({
            title: '添加文章分类',
            content: $("#addcategoryinput").html(),
            area: ['500px', '250px'],
            type: 1,
        });
    })

    //3 点击提交时，name属性值的修改
    // /my/article/addcates
    $("body").on("submit", "#widthinput", function (e) {
        e.preventDefault();
        // console.log($("#widthinput").serialize())
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $("#widthinput").serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status != 0) {
                    layui.layer.msg("新增分类列表失败！")
                }
                // 重新加载页面数据
                initcatagory()
                // 弹出框消失
                layer.close(indexaddinput)
            }
        })
    })

    // 3.重置
    //    $("")
    var layer = layui.layer
        , form = layui.form;
    var editinput = null;
    // 4.编辑功能
    $("tbody").on("click", ".btn-edit", function () {
        // alert(1)
        // 定义弹出框
        editinput = layer.open({
            title: '修改文章分类',
            content: $("#editcategoryinput").html(),
            area: ['500px', '250px'],
            type: 1,
        });

        // 获取id
        var id = $(this).attr("data-id")
        // console.log(id)
        // 根据id获取对应数据，form.val，填充到页面
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: function (res) {
                // console.log(res.data)
                if (res.status != 0) {
                    return layui.layer.msg("获取文章分类数据失败")
                }
                // 内置模块表单赋值，---填充到页面
                form.val("editsarticle",//formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                    res.data
                )
            }



        })
    })

    // 点击确认修改
    $("body").on("submit", "#editsarticle", function (e) {
        // alert(1)
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $("#editsarticle").serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg("更新文章分类数据失败")
                }
                layer.close(editinput)
                // 重新加载页面
                initcatagory()
            }
        })
    })


    // 点击删除
    $("tbody").on("click", ".editcategory-del", function () {
        // alert(1)
        // 获取id
        var id = $(this).attr("data-del")
        console.log(id)
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                // data: "id=" + id,
                success: function (res) {
                    console.log(res)
                    if (res.status != 0) {
                        return layui.layer.msg("删除文章分类数据失败")
                    }
                    layui.layer.msg("删除文章分类成功")
                    layer.close(index);
                    initcatagory()
                }
            })

        });


    })




    // 封装初始化页面函数
    function initcatagory() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res.data)

                if (status != 0) {
                    layui.layer.msg("获取文章分类列表失败")
                }
                // 引入模板引擎
                var html = template("catagorydata", res)
                $("tbody").html(html)
            }
        })
    }









    // end
})

