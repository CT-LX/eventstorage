//每次调用ajax的时候，都会调用ajaxPrefilter这个函数
// 在这个函数中可以获取到给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url) 
    options.url = "http://ajax.frontend.itheima.net" + options.url;
})