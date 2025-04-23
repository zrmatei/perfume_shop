import mysql from "mysql2/promise.js";
import perfumesData from './perfumesData.js';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Razvan2003@',
  database: 'shop'
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
