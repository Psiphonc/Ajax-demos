const express = require("express");
const pathJoin = require("path").join;
const mongoose = require("mongoose");
const Province =  require("./model/province")
const City =  require("./model/city")
const County =  require("./model/county")

mongoose.connect("mongodb://localhost/area").
    then(() => console.log("数据库连接成功")).
    catch(() => console.log("数据库连接失败"));

const app = express();

app.use(express.static(pathJoin(__dirname, "public")));
app.get("/verifyEmailAddress", (req, res) => {
    let ret = false;
    let msg = "该邮箱已经被注册过了";
    console.log(req.query);
    if(req.query.email.trim().toLowerCase() === "psiphonc@outlook.com"){
        ret = true;
        msg = "恭喜邮箱地址可用";
    }
    res.send({
        ret,
        msg
    });
});
app.get("/hotquery",(req, res) => {
    let kw = req.query.keyword;
    let ret = [];
    for (let i = 0; i < 5; ++i) {
        ret.push(kw+i);
    }
    res.send({
        kws: ret
    });
})
app.get("/query/province", async (req, res) => {
    let ret = await Province.find({});
    res.send(ret);
});
app.get("/query/city", async (req, res) => {
    let ret = await City.find({province_id: mongoose.Types.ObjectId(req.query.provinceId)});
    // console.log(ret);
    res.send(ret);
});
app.get("/query/county", async (req, res) => {
    let ret = await County.find({city_id: mongoose.Types.ObjectId(req.query.cityId)});
    console.log(ret);
    res.send(ret);
});
app.listen(3000);
console.log("服务器启动成功");