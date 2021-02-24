const mysql = require('mysql2');
const { setConnection } = require('../database/core');

const connection = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE_NAME,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

connection
  .connect()
  .then(() =>
    console.log(
      `Successfully connected to database ${process.env.MYSQL_DATABASE_NAME}`
    )
  )
  .catch((error) => {
    console.log(`Database connection error: ${error}`);
  });

connection.query(`create table if not exists comments ( 
  id int unsigned auto_increment primary key, 
  name varchar(30) not null, 
  text varchar(200) not null, 
  date timestamp default current_timestamp)`);

setConnection(connection);
