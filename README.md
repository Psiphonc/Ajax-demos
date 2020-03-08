# 案例源码
[github](https://github.com/Psiphonc/Ajax-demos)
# 验证邮箱唯一性
```js
$(function () {
    $("#email").on({
        "focus": function() {
            if($(this).val() === "请输入邮箱地址") {
                $(this).val("");
                
            }
        },
        "blur": function() {
            var email = $(this).val().trim();
            if(email === "") {
                $(this).val("请输入邮箱地址"); 
                $(".info").fadeOut();
            } else {
                // $(this).fadeIn();
                var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (!pattern.test(email)) {
                    $(".info").text("请输入符合规则的邮箱地址！").css("background-color", "#f2dede").fadeIn();
                    return;
                } else {
                    ajax({
                        url: "http://localhost:3000/verifyEmailAddress",
                        cb: function(result) {
                            var {ret, msg} = result;
                            console.log(result);
                            var boxClass = "";
                            if(ret) {
                                $(".info").css("background-color", "#96d196");
                            } else {
                                $(".info").css("background-color", "#f2dede");
                            }
                            $(".info").text(msg).fadeIn();
                        },
                        error: function(data) {
                            console.log(data);
                        },
                        data: {
                            email
                        }
                    })
                }
            }
        }
    });
});
```
# 搜索框内容提示
1. 获取搜索框并为其添加用户输入事件
2. 获取用户输入的关键字
3. 向服务器发送请求并携带关键字作为请求参数
4. 将响应数据显示在搜索框底部

```js
$(function () {
    // 设置定时器 避免频繁向服务器请求无用数据
    $("#search").timer = null;
    $("#search").on({
        'input': function () {
            // 若输入了新字符 则清除上一个定时器
            clearTimeout($(this).timer);
            if($(this).val().trim() === ""){
                $(".list-group").hide();
                return;
            }
            $(this).timer = setTimeout( () => {
                ajax({
                url: "http://localhost:3000/hotquery",
                data: {
                    keyword: $(this).val()
                },
                cb: function(data) {
                    let kws = data.kws;
                    let html = template("tpl", {kws});
                    $(".list-group").show().html(html);
                }
            })}, 800);
        },
        'blur': function() {
            $(".list-group").hide()
        }
    })
});
```
# 省市区三级联动
1. 通过接口获取省份信息
2. 使用js获取省市区下拉框元素
3. 将服务器端返回的省份信息显示在下拉框中
4. 为下拉框元素添加表单值改变事件（change）
5. 当用户选择省份时，根据省份id获取城市信息
6. 当用户选择城市时，根据城市id获取县城信息

[mongodb省市区数据库](https://github.com/wendell-dev/area-china)