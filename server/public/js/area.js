$(function () {
    ajax({
        url: "http://localhost:3000/query/province",
        cb: function(provinces) {
            let opts = template("tpl", {
                val: provinces,
                msg: "省份"
            });
            $("#province").html(opts);
        }
    });
    $("#province").on("change", function() {
        let provinceId = $(this).val();
        ajax({
            url: "http://localhost:3000/query/city", 
            data: {
                provinceId 
            },
            cb: function (cities) {
                let opts = template("tpl", {
                    val: cities,
                    msg: "城市"
                }); 
                $("#city").html(opts);
                $("#county").html("<option>请选择区县</option>"); 
                
            }
        });
    });
    $("#city").on("change", function() {
        let cityId = $(this).val();
        ajax({
            url: "http://localhost:3000/query/county", 
            data: {
                cityId 
            },
            cb: function (counties) {
                let opts = template("tpl", {
                    val: counties,
                    msg: "区县"
                }); 
                $("#county").html(opts);
            }
        });
    });
});