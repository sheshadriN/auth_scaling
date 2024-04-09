// db.js
import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";
import Redis from "ioredis";
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379
});

console.log("connecting to redis");
redisClient.on("connect", () => {
  console.log("Connected!!! to redis");
});
redisClient.on("error", (err) => {
  console.log("error int the redis Connection!!!"+err);
});

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB,
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL server");
  const create_table = `CREATE TABLE IF NOT EXISTS users(
          id INT AUTO_INCREMENT PRIMARY Key,
          username varChar(255) not null,
          email varChar(255) not null,
          password varChar(255) not null)`;
  connection.query(create_table, (err, result) => {
    if (err) {
      console.log(err.message);
    }
    console.log("database is created successfully");
  });
});

export default { connection, redisClient };
