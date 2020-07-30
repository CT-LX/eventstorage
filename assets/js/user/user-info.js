$(function () {
    // 获取用户信息--封装init，默认渲染，
    // ，验证用户昵称，邮箱，
    // 提交修改功能，
    // 重置--再次调用init

    initpage()


    // 自定义验证用户昵称
    // 提交修改功能，
    $("#forms").on("submit", function (e) {
        e.preventDefault();
        //   console.log($("#forms").serialize())
        $.ajax({
            url: "/my/userinfo",
            type: "POST",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)

                window.parent.getuser()
                // 页面和iframe同步更换--// 调用父页面中的方法，重新渲染用户的头像和用户的信息
            }

        })
    })


    // 重置--再次调用init
    $(".resetbtn").on("click", function () {
        initpage()
    })
    // end
})




function initpage() {
    var layer = layui.layer
        , form = layui.form;
    $.ajax({
        url: "/my/userinfo",
        type: "get",
        success: function (res) {
            // console.log(res)
            // {id: 3075, username: "forever", nickname: "", email: "", user_pic: null}
            // 使用form.val填充数据
            form.val("formval", res.data);
            // 自定义验证用户昵称
            form.verify({
                nickname: function (value) {
                    if (value.length > 6) {
                        return '昵称长度必须在 1 ~ 6 个字符之间！'
                    }
                }
            })

            // 提交修改功能，---通过隐藏域保存id
            $(".hid").val(res.data.id)
        }
    })
}

