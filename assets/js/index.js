$(function () {
    // 绘制主页iframe
    // 个人中心 图像结构，样式，js，
    // 退出功能
    // token登录状态的权限访问，全局配置header请求头
    // complete 全局配置

    // 个人中心
    getuser()


    // 用户没有登录，就无法访问网页
    // 控制用户的访问权限，通过ajax的complete方法,
    // options.complete 
    var layer = layui.layer;
    // 实现退出功能
    $(".btnLogout").on("click", function () {
        // 弹出提示框，询问框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem("token")
            location.href = '/login.html'
            layer.close(index);
        });
        // 清空token
        // 跳转到登录
    })
    // end
})
function getuser() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            // console.log(res)
            // console.log(res.data)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 initperson 渲染用户的头像
            initperson(res.data);
        }
    })
}
function initperson(data) {
    // console.log(data)
    // 显示对应的文字
    if (data.nickname || data.username) {
        $("#huanying").html(data.nickname)
    }
    if (data.user_pic == null) {
        // 显示第一个字母
        var name = data.username[0].toUpperCase();
        // console.log(name)
        $(".imgbox").html(name).show()
        $(".layui-nav-img").hide();
    } else {
        // 显示图像
        console.log(data)
        $(".imgbox").hide()
        $(".layui-nav-img").attr("src", data.user_pic);

    }
}

