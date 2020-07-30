$(function () {
    // 新密码框定义验证规则
    // 两次密码验证
    // 修改密码功能
    // 重置，reset():
    var layer = layui.layer
        , form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //验证两次密码
        twopass: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    // 修改密码功能
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/my/updatepwd",
            data: $(this).serialize(),
            type: "post",
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
    // 重置，reset():


    // end
})