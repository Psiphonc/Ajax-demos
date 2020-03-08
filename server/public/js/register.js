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