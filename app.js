
/**
 * Created by Administrator on 2017/5/10.
 */

const express = require('express');
const app = express();
const route = require('./routes');

//设置模板引擎
app.set('view engine', 'ejs');

//中间件
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/", route.showIndex);
app.get("/:albumName", route.showPic);

//404页面
app.use("/",function (req,res) {
    res.render('error');
});
app.listen(3005);
console.log("服务器已启动...");