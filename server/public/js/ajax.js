function ajax(opt) {
    // 默认参数
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
        'Content-Type': "application/x-www-form-urlencoded"
        },
        cb: function () {},
        error: function () {}
    }; 
    Object.assign(defaults, opt);
    // 创建ajax对象
    var xhr = new XMLHttpRequest();
    var params = '';
    for (var attr in defaults.data) {
        params += attr + '=' + defaults.data[attr] + '&';
    }
    params = params.substr(0, params.length - 1); //将参数最后的&截掉
    if (defaults.type.toLowerCase() === 'get') {
        defaults.url = defaults.url + '?' + params;
    }
    // 配置ajax对象
    xhr.open(defaults.type, defaults.url);
    if (defaults.type.toLowerCase() === 'post'){
        // 用户希望向服务器端传递的请求参数的类型   
        var contentType = defaults.header['Content-Type'];
        xhr.setRequestHeader('Content-Type', contentType);
        if (contentType.toLowerCase() === 'application/json'){
            xhr.send(defaults.data); 
        } else if(contentType.toLowerCase() === 'application/x-www-form-urlencoded') {
            xhr.send(params);
        }
    } else {
    // 发送请求
    xhr.send();
    }
    // 监听xhr下的load事件
    xhr.addEventListener('load', function() {
        var contentType = xhr.getAllResponseHeaders('Content-Type');
        var responseText = xhr.responseText;
        if(contentType.includes('application/json')){
            responseText = JSON.parse(responseText);     
        }
        if (xhr.status === 200) {
            defaults.cb(responseText, xhr);
        } else {
            defaults.error(responseText, xhr);
        }
    });   
}