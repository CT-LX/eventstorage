$(function () {
    // 富文本框的使用：
    // 引入tinymce.min.js
    // tinymce_setup.js
    // 调用initEditor()方法
    // render 渲染页面

    // 初始化富文本编辑器
    initEditor()


    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 1.文章类别渲染
    catalist()

    var state = "发布";


    // 获取富文本框的参数content
    // 获取state
    // 获取裁剪图片cover_img




    //2. 点击触发change事件，获取图片路径
    $(".selectimg").on("click", function () {
        // 触发文件上传
        $("#imgs").click();
    })

    $("#imgs").change(function (e) {
        // console.log(1)
        var file = e.target.files;
        // console.log(file)
        if (file.length === 0) {
            return alert("请上传文件")
        }
        // 创建路径
        var newImgURL = URL.createObjectURL(file[0]);

        // 上传成功，重新定义裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 点击了存为草稿，修改文件发布状态
    $(".caogao").on("click", function () {
        state = "草稿";
    })
    

    // 点击发布
    $("#catelistpub").on("submit", function (e) {
        e.preventDefault();
        // 实例化formdata
        var fd = new FormData($("#catelistpub")[0]);
        //  将文章的发布状态，存到 fd 中
        fd.append('state', state)
        //  将封面裁剪过后的图片，输出为一个文件对象
        $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // console.log(blob)
                // fd.forEach(function (item, index) {
                //     console.log(item)
                //     console.log(index)
                // })
                // 发起ajax请求，发布
                release(fd)
            })



    })



    function catalist() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res.data)
                if (status != 0) {
                    layui.layer.msg("获取文章分类列表失败")
                }
                // 引入模板引擎
                var html = template("catalists", res)
                $(".selectcata").html(html)
                // 调用layui的render方法渲染数据
                layui.form.render(); //更新全部
            }
        })
    }


    function release(fd) {
        $.ajax({
            url: "/my/article/add",
            type: "POST",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res)
                if (res.status != 0) {
                    return layui.layer.msg(res.msg)
                }
                // 跳转到文章列表
                location.href = "../../../../../artic/list.html"
            }
        })

    }



    // end
})