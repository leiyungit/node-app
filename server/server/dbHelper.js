//封装事务回滚函数
const db = require('../config/db');
const async = require("async");

const execTrans = function (sqlparamsEntities, callback) {
    db.pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err, null);
        }
        connection.beginTransaction(function (err) {
            if (err) {
                return callback(err, null);
            }
            //console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
            var funcAry = [];
            sqlparamsEntities.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                console.log("事务失败，" + sql_param + "，ERROR：" + tErr);
                                //throw tErr; // 这里会直挂掉服务 调用的位置无法try捕获异常消息
                                return callback(tErr, null);
                            });
                        } else {
                            return cb(null, rows);
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                if (err) {
                    connection.rollback(function (err) {
                        console.log("transaction error: " + err);
                        //connection.release();
                        db.pool.releaseConnection(connection);
                        return callback(err, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        //console.log("transaction info: " + JSON.stringify(info));
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                console.log("transaction error: " + err);
                                //connection.release();
                                db.pool.releaseConnection(connection);
                                return callback(err, null);
                            });
                        } else {
                            //connection.release();
                            db.pool.releaseConnection(connection);
                            return callback(null, info);
                        }
                    })
                }
            })
        });
    });
}

module.exports = {
    execTrans: execTrans,
}
