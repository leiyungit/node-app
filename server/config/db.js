const mysql = require('mysql');
const cfg = require('./db.config');
const pool = mysql.createPool({
  connectionLimit: 20, // 连接池连接数
  host: cfg.mysql.host, // 数据库地址，这里用的是本地
  user: cfg.mysql.user,
  password: cfg.mysql.password,
  database: cfg.mysql.database,
  port: cfg.mysql.port
});
const query = function(sql,sqlParams,callback){
  pool.getConnection(function (err, conn) {
      if (err) {
          callback(err, null, null);
      } else {
          conn.query(sql, sqlParams, function (qerr, vals, fields) {
              callback(qerr, vals, fields);
          });
      }
      // conn.release(); // not work!!!
      pool.releaseConnection(conn);
  });
};
module.exports = {
  pool: pool,
  query: query
};
// var query2=function(sql,sqlParams,callback){
//   pool.getConnection(function(err,conn){
//    if(err){
//     callback(err,null,null);
//    }else{
//     conn.query(sql,sqlParams,function(qerr,vals,fields){
//      //释放连接
//      conn.release();
//      //事件驱动回调
//      callback(qerr,vals,fields);
//     });
//    }
//   });
//  };
// module.exports=query;2
// // 返回一个Promise链接
// const connectHandle = () => new Promise((resolve, reject) => {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.log('链接错误：' + err.stack + '\n' + '链接ID：' + connection.threadId)
//       reject(err)
//     } else {
//       console.log(`MySql 连接成功 ${connection.threadId}`); // 
//       resolve(connection)
//     }
//   })
// });
//module.exports = connectHandle;