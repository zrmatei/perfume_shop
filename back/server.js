import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const requireAuth = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "alice.fadel@ethereal.email",
    pass: "yeAuCaNgwmEQPeBaSc",
  },
});

function genVoucherCode() {
  const random = Math.random().toString(36).substring(2, 8);
  let voucherCode = "";
  for (const char of random) {
    voucherCode +=
      Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase();
  }
  return `void${voucherCode}`;
}

db.connect((err) => {
  if (err) {
    console.log("DB error: ", err);
  } else {
    console.log("Connected to db");
  }
});

//REGISTER
app.post("/register", (req, res) => {
  const {
    email,
    pass,
    stradaNr,
    codPostal,
    oras,
    judet,
    nrTel,
    nume,
    prenume,
  } = req.body;
  if (
    !email ||
    !pass ||
    !stradaNr ||
    !codPostal ||
    !oras ||
    !judet ||
    !nrTel ||
    !nume ||
    !prenume
  ) {
    return res.status(400).json({ msg: "Details required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Server error" });
      } else if (results.length > 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const hPass = await bcrypt.hash(pass, 10);
      db.query(
        "INSERT INTO users (email, user_pass, strada_nr, cod_postal, oras, judet, telefon, nume, prenume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [email, hPass, stradaNr, codPostal, oras, judet, nrTel, nume, prenume],
        (err) => {
          if (err) {
            console.error("err:", err);
            return res.status(500).json({ msg: "Error creating user" });
          }
          res.status(201).json({ msg: "User created" });
        }
      );
    }
  );
});

//LOGIN
app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ msg: "Email and pass required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Server error" });
      }
      if (results.length === 0) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const user = results[0];
      const match = await bcrypt.compare(pass, user.user_pass);

      if (match) {
        const token = jwt.sign(
          { id: user.id, email: user.email},
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );
        res.json({ msg: "Login succesful", token });
      } else {
        res.status(400).json({ msg: "Invalid credentials" });
      }
    }
  );
});

app.get("/verify", requireAuth, (req, res) => {
  res.json({ msg: "Token valid", user: req.auth });
});

app.get("/infouser", requireAuth, (req, res) => {
  const uid = req.auth.id;
  db.query(
    "SELECT nume, prenume, puncte_fidelitate, is_admin FROM users WHERE id = ?",
    [uid],
    (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ msg: "Server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      const { nume, prenume, puncte_fidelitate, is_admin } = results[0];
      res.json({ nume, prenume, puncte_fidelitate, isAdmin: is_admin });
    }
  );
});

app.post("/generate-voucher", requireAuth, async (req, res) => {
  const uid = req.auth.id;
  const percent = 5;
  const requiredPoints = 1500;

  try {
    const [rows] = await db
      .promise()
      .query(`SELECT puncte_fidelitate FROM users WHERE id = ?`, [uid]);

    const uPoints = rows[0]?.puncte_fidelitate || 0;

    if (uPoints < requiredPoints) {
      return res.status(403).json({ msg: "Not enough points to generate voucher" });
    }

    const code = genVoucherCode();
    const discountValue = (requiredPoints * (percent / 100)).toFixed(2);

    await db.promise().query(
      `INSERT INTO vouchers (code, percent, discount_value, expires_at)
       VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
      [code, percent, discountValue]
    );

    await db.promise().query(
      `UPDATE users
       SET puncte_fidelitate = puncte_fidelitate - ?
       WHERE id = ?`,
      [requiredPoints, uid]
    );

    res.json({ code, percent, discount_value: discountValue });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error while generating voucher" });
  }
});


app.get("/analytics", requireAuth, async(req, res) => {
  try {
    const [users] = await db.promise().query("SELECT COUNT(*) AS totalUsers FROM users")
    const [orders] = await db.promise().query("SELECT COUNT(*) AS totalOrders, SUM(total) AS revenue, AVG(total) AS avgOrderVal FROM orders")

    res.json({
      totalUsers : users[0].totalUsers,
      totalOrders : orders[0].totalOrders,
      revenue : orders[0].revenue || 0,
      avgOrderVal : Math.round(orders[0].avgOrderVal || 0) 
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({msg: "Can't generate analytics"})
  }
})

app.get("/analytics/judete", async(req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT judet, COUNT(*) AS totalOrders, SUM(total) AS revenue
      FROM orders
      GROUP BY judet`
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({msg: "Err on counties"})
  }
})

app.post("/checkout", async (req, res) => {
  let userid = null;
  let userEmail = null;
  const { produse, total, livrare, discountCode } = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userid = decoded.id;
      userEmail = decoded.email;
    } catch (err) {
      console.warn("No token, guest detected");
    }
  }

  if (!Array.isArray(produse) || produse.length === 0) {
    return res.status(400).json({ msg: "No products added" });
  }

  const {
    firstName,
    lastName,
    email,
    address,
    county,
    city,
    postalCode,
    phoneNo,
    apt,
  } = livrare;
  const finalEmail = email || userEmail;

  let discount = 0;
  if (discountCode) {
    const [rows] = await db.promise().query(
      `SELECT value FROM vouchers
    WHERE code = ? AND expires_at > NOW() AND is_used = FALSE`,
      [discountCode]
    );
    if (rows.length > 0) {
      discount = rows[0].value;
      await db.promise().query(
        `UPDATE vouchers
      SET is_used = TRUE
      WHERE code = ?`,
        discountCode
      );
    } else {
      return res.status(400).json({ msg: "Invalid or expired voucher" });
    }
  }

  if (userid) {
    const puncte = Math.floor(total * 0.05);
    await db.promise().query(
      `UPDATE users SET puncte_fidelitate = puncte_fidelitate + ? WHERE id = ?`,
      [puncte, userid]
    );
  }

  try {
    const [orderResult] = await db.promise().query(
      `INSERT INTO orders (userid, nume, prenume, email, stradaNr, judet, oras, codPostal, nrTel, discount, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userid,
        firstName,
        lastName,
        email,
        address + (apt ? `, ${apt}` : ""),
        county,
        city,
        postalCode,
        phoneNo,
        discount,
        total,
      ]
    );

    const orderId = orderResult.insertId;
    const values = produse.map((produs) => [
      orderId,
      produs.id,
      produs.name,
      produs.brand,
      produs.price,
    ]);

    await db.promise().query(
      `INSERT INTO order_items (order_id, product_id, product_name, product_brand, price)
       VALUES ?`,
      [values]
    );

    const prodList = produse
      .map((p) => `- ${p.name} ${p.brand} (${p.price} lei)`)
      .join("\n");
    const mail = {
      from: '"Void" <alice.fadel@ethereal.email>',
      to: finalEmail,
      subject: "Order confirmed",
      text: `
      Salut!
      Thank you for shopping with us! Here are the billing details:

      Order #${orderId}
      Products:
      ${prodList}

      Total: ${total} lei
      Discount: ${discount} lei
      Shipping to: ${address}${
        apt ? ", " + apt : ""
      }, ${city}, ${county}, ${postalCode}

      See you soon,
      Void
      `,
      html: `
      <h3>Hey</h3>
      <p>Thank you for shopping with us! Here are the billing details:</p>
      <p><b>Order #${orderId}</b></p>
      <ul>
        ${produse.map((p) => `<li>${p.name} - ${p.price} lei</li>`).join("")}
      </ul>
      <p><b>Total:</b> ${total} lei<br/>
      <b>Discount:</b> ${discount} lei</p>
      <p><b>Address:</b> ${address}${
        apt ? ", " + apt : ""
      }, ${city}, ${county}, ${postalCode}</p></br>
      <p style="color:#888">Void</p>
      `,
    };
    await transporter.sendMail(mail);
    res.status(201).json({ msg: "Order processed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Order not processed" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
