$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)


    // cv完成基本结构，样式，

    // 隐藏input：file，点击上传，显示，完成数据上传
    //实现上传功能
    $(".loads").on("click", function () {
        // 模拟点击文件上传
        $("#hidden-file").click();

    })
    // 获取文件路径
    $("#hidden-file").on("change", function (e) {
        // console.log(e.target.files)
        var filelist = e.target.files;
        if (filelist.length <= 0) {
            return layui.layer.msg("'请选择照片！")
        }
        // 拿到用户选择的文件
        var myfile = e.target.files[0]
        // 将文件转化为路径
        var imgurl = URL.createObjectURL(myfile)

        // 3. 重新初始化裁剪区域 
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgurl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    // 图片裁剪工具----cropper


    // 点击确定，上传到服务器更新页面
    // 获取avatar参数  --base64格式的字符串
    // 为确定按钮，绑定点击事件
    $('#btnUpload').on('click', function () {
        console.log(1)
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: function (res) {
                console.log(res)
                if (res.status != 0) {
                    layui.layer.msg("更换图像失败！")
                }
                layui.layer.msg("更换图像成功！")

                window.parent.getuser()
            }
        })
    })


    // end
})