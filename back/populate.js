import mysql from "mysql2/promise.js";
import perfumesData from './perfumesData.js';
import dotenv from "dotenv";


dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB
});

for (const p of perfumesData) {
  await connection.execute(
    `INSERT INTO products (prod_name, brand, price, stock)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE price = VALUES(price), stock = VALUES(stock)`,
    [p.name, p.brand, p.price, 10]
  );
}


console.log('Parfumurile au fost inserate cu succes!');
await connection.end();
