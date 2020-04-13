const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入user.js
const usersApi = require("./server/api/users");
//const profiles = require("./server/api/profiles");

// DB config
const db = require('./config/db');

// 使用body-parser中间件
app.use(bodyParser.urlencoded({
     extended: false
}));
app.use(bodyParser.json());
// 连接数据库
// mongoose.connect(db)
//         .then(()=>console.log("MongoDB 连接成功"))
//         .catch((err)=> console.log(err));
//mongoose.Promise = global.Promise;  
// 连接数据库
// var connection = mysql.createConnection(models.mysql);
// connection.connect((err) => {
//      if (err) {
//         console.log('Connection Error:'+err);
//      }else{
//         console.log(`MySql 连接成功 ${connection.threadId}`); // 
//      }
// });
db.pool.getConnection(function (err, connection) {
     if (err) {
          console.log('Connection Error:' + err);
     } else {
          console.log(`MySql 连接成功 ${connection.threadId}`); // 
          //释放连接,归还到连接池中    
          connection.release();
          //从连接池中移除时，用connection对象的destroy方法。
          //connection.destroy();
     }
     // 事件驱动回调    
});

// passport 初始化
app.use(passport.initialize());
require("./config/passport")(passport);
//require("./config/passport")(passport, connection);

app.get("/", (req, res) => {
     res.send("plan api ...");
})

// 使用routes
app.use("/api/users", usersApi);
//app.use("/api/profiles",profiles);

const port = process.env.PORT || 5005;

app.listen(port, () => {
     console.log(`Server Runnion on port ${port}`)
})