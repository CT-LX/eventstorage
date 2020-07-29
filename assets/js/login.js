
$(function () {
    var form = layui.form;
    // 弹出层
    var layer = layui.layer;
    // 登录页面切换
    $(".regis-count").on("click", function () {
        // 登录页面隐藏，注册显示
        $("#register").show();
        $("#loging").hide();
    })

    $(".login-count").on("click", function () {
        // 登录页面隐藏，注册显示
        $("#register").hide();
        $("#loging").show();
    })

    // 自定义验证规则


    // 实现登录
    $("#loging").submit(function (e) {
        //阻止submit的默认行为
        e.preventDefault();

        if ($("#loging [name=username]").val().trim() == "" || $("#loging [name=password]").val().trim() == "") {
            return layer.msg("用户名和密码不能为空");
        }


        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    // 弹出失败提示框
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                // token 保存到本地
                localStorage.setItem("token", res.token)
                location.href = "index.html"
            }
        })
    })


    // 实现注册---正则验证
    $("#register").on("submit", function (e) {
        e.preventDefault();
        // console.log(1)
        // console.log(data)
        // 密码正则
        var pwdreg = /^[a-z0-9_-]{6,18}$/;
        if (!pwdreg.test($(".password").val())) {
            return layer.msg("请输入6-18位字母、下划线、中划线");
        }
        if ($(".repassword").val().trim() !== $(".password").val().trim() || $(".repassword").val().trim() == "") {
            return layer.msg("两次密码不一致");
        }
        var data = $(this).serialize();
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('.login-count').click()
        })


        // $.ajax({
        //     type: "POST",
        //     url: "/api/reguser",
        //     data: $(this).serialize(),
        //     success: function (res) {
        //         console.log(res)
        //         // if (res.status != 0) {
        //         //     return layer.msg(res.message);
        //         // }
        //         // layer.msg(res.message);
        //         // 跳转到登录
        //         // $(".login-count").click();
        //     }
        // })


    })















    // end
})