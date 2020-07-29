//每次调用ajax的时候，都会调用ajaxPrefilter这个函数
// 在这个函数中可以获取到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url) 
    options.url = "http://ajax.frontend.itheima.net" + options.url;


    // 每次发送请求，验证token
    if (options.url.indexOf("/my") >= 0) {
        options.headers = {
            Authorization: localStorage.getItem("token") || '',//本地没有token的时候，返回空字符串
        }
    }


    // 用户没有登录，就无法访问网页，后台返回message: "身份认证失败！"status: 1
    // complete函数，res.responseJSON返回了登录状态
    options.complete = function (res) {
        // 后台返回res.responseJSON  message: "身份认证失败！"status: 1
        // console.log(res.responseJSON)
        if(res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！"){
            // 清空token
            localStorage.removeItem("token")
            // 跳转到登录页面
            location.href = '../../login.html';
        }
    }
})
