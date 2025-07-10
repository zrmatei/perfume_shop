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

try {
  for (const p of perfumesData) {
    await connection.execute(
      `INSERT INTO products (prod_name, brand, price, stock)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE price = VALUES(price), stock = VALUES(stock)`,
      [p.name, p.brand, p.price, 10]
    );
  }

  await connection.execute(`
    DELETE FROM products
    WHERE id NOT IN (
      SELECT min_id FROM (
        SELECT MIN(id) as min_id
        FROM products
        GROUP BY brand, prod_name
      ) AS unique_perfumes
    );
  `);

  console.log("Parfumuri adaugate cu succes");
} catch (err) {
  console.error("Eroare la inserare:", err);
} finally {
  await connection.end();
}
