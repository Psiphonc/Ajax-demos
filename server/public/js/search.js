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