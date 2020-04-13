// login & register
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
//const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require("passport");
const db = require('../../config/db');
const $sql = require('../sqlMap');
// 事物 1 2
const _getNewSqlParamEntity = require('../initSqlParams');
const dbhelper = require("../dbHelper");
// 加盐
const SALT_WORK_FACTOR = 10;

// 连接数据库
// let conn = mysql.createConnection(models.mysql);
// conn.connect();
let jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        //res.status(300).json(err); 
        res.send(err);
    } else {
        //res.status(200).json(`ok`); // 先放开注释，验证
        res.send('ok')
    }
};
// $route POST api/users/register
// @desc  返回请求的json数据
// @access public
router.get("/test", (req, res) => {
    res.json({
        msg: "login work"
    })

})

router.post("/register", (req, res) => {
    console.log(req.body);
    // 查询数据库中是否存在邮箱
    var sql_name = $sql.users.select_name;
    var sql = $sql.users.add;
    var params = req.body; // req.body.email

    db.query(sql_name, params.username, (err, result) => {
        //console.log(result.counts);
        if (err) {
            console.log(err)
        }
        if (result[0] === undefined) {
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) {
                    return next(err)
                }
                bcrypt.hash(params.password, salt, null, function (err, hash) {
                    if (err) return next(err)
                    //console.log(hash)
                    let _password = hash;
                    db.query(sql, [params.username, _password], function (err, result) {
                        if (err) {
                            console.log(err)
                        }
                        if (result) {
                            jsonWrite(res, result);
                        }
                    })
                })

            })
        } else {
            //res.send('-1')    //当前注册username与数据库重复时，data返回-1
            return res.status(400).json("用户名已被注册！" + req.body.email)
        }
    });
});

// $route POST api/users/login
// @desc  返回token jwt passport
// @access public
router.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    db.query($sql.users.select_name, username, (err, result) => {
        //console.log(result);
        if (err) {
            console.log(err)
        }
        if (result[0] === undefined) {
            //res.send('-1')    //当前注册username与数据库重复时，data返回-1
            return res.status(400).json("用户不存在")
        } else {
            let user = result[0];
            //console.log(result[0].password);
            //console.log(`${password} 密码hash：${user.password}`);
            // 密码匹配
            let isPass = bcrypt.compareSync(password, user.password);
            console.log(`isPass:${isPass}`);
            bcrypt.compare(password, user.password, (err, pass) => {
                // res == true
                if (pass === true) {
                    //jwt.sign("规则", "加密名称", "过期时间","箭头函数");
                    //res.json({msg:"success"});
                    let rule = {
                        id: user.id,
                        name: user.username,
                        status: user.status
                    };
                    jwt.sign(rule, keys.secretOrKey, {
                        expiresIn: "1h"
                    }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: keys.Bearer + token
                        })
                    });
                } else {
                    return res.status(400).json("密码错误");
                }
            });
        }
    });
});

// $route GET api/users/current
// @desc  return current user  验证token
// @access private
router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.username,
        status: req.user.status
    })
});

// $route POST api/users/testTrans
// @desc  事物处理测试  验证token
// @access public
router.get("/testTrans", (req, res) => {
    //如果你要执行多条sql语句，则需要：
    console.log("/api/users/testTrans");
    let sqlParamsEntity = [];
    //var sql1 = "insert table set a=?, b=? where 1=1";
    //var param1 = {a:1, b:2};
    //sqlParamsEntity.push(_getNewSqlParamEntity(sql1, param1));
    let sql1 = `insert into trans (name,age) VALUES('burt',19)`;
    sqlParamsEntity.push(_getNewSqlParamEntity(sql1));
    sql1 = `insert into trans (name,age) VALUES('bur',23)`;
    sqlParamsEntity.push(_getNewSqlParamEntity(sql1))
    sql1 = `insert into trans (name,age) VALUES('jing',20)`;
    sqlParamsEntity.push(_getNewSqlParamEntity(sql1))

    // try {
        //let ret;
        dbhelper.execTrans(sqlParamsEntity, function (err, info) {
            if (err) {
                console.log(`事务执行失败 ${err}`);
                //console.log(info);
                //console.error("事务执行失败");
                res.send("err");
            } else {
                console.log("done.");
                console.log(info);
                // ret = info;
                jsonWrite(res, info);
            }
        });
    // } catch (err) {
    //    console.log(`catch err: ${err}`);
    // }
});

module.exports = router;
