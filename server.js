import express from "express";
import mysql from "mysql";
import morgan from "morgan";

const App = express();
App.use(express.json());
App.use(morgan("dev"));
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Shesha@007",
  database: "shesha",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL server");
  const create_table = `CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY Key,
            username varChar(30) not null,
            email varChar(20) not null,
            password varChar(255) not null)`;
  connection.query(create_table, (err, result) => {
    if (err) {
      console.log(err.message);
    }
    console.log("database is created successfully");
  });
});

App.post('/registerOtp',registerOTP);
const registerOTP=()=>{
  
}

App.listen(3000, () => {
  console.log(`server is running http://localhost:3000`);
});
