var sqlMap = {
    users: {
        add: 'insert into users( username, password) values ( ?, ?)',
        select_name: 'SELECT * from users where username = ?',   
        select_id: 'SELECT * from users where id = ?',  
        //select_name: 'SELECT count(username) count from users where username = ?',    //查询 username
        //select_single: 'SELECT * from users where ?',      //查询   let post  = {userId: 1, name: 'test'}
        //login: 'SELECT * from users where username = ? and password = ?'      // 登录
    }
}
module.exports = sqlMap;