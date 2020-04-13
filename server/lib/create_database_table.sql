
create DATABASE testdb;

show databases;

use testdb;
drop table users;
create table users(  
id int not null primary key auto_increment,  
username varchar(100) not null,  
`password` varchar(100) not null,
`status` varchar(1) default 'Y',
UNIQUE(`username`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;  
select * from users;
desc users;

drop table trans;
create table trans(  
id int not null primary key auto_increment,  
`name` varchar(4) not null,  
`age` INT(2) not null,
UNIQUE(`name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;  
select * from trans;
desc trans;
delete from trans;

SELECT 1 + 1 AS solution
SELECT count(*) from users where username = 
SELECT * from users 