import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken"
import {expressjwt} from "express-jwt"
import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const requireAuth = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"]
})

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'alice.fadel@ethereal.email',
      pass: 'yeAuCaNgwmEQPeBaSc'
  }
});


db.connect((err) => {
  if (err) {
    console.log("DB error: ", err);
  } else {
    console.log("Connected to db");
  }
});

//REGISTER
app.post("/register", (req, res) => {
  const { email, pass, stradaNr, codPostal, oras, judet, nrTel, nume, prenume } = req.body;
  if (!email || !pass || !stradaNr || !codPostal || !oras || !judet || !nrTel || !nume || !prenume) {
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
          {id: user.id, email: user.email},
          process.env.JWT_SECRET,
          {expiresIn: "15m"}
        )
        res.json({msg: "Login succesful", token})

      } else {
            res.status(400).json({ msg: "Invalid credentials" });
      }
    }
  );
});

app.get("/verify", requireAuth, (req, res) => {
  res.json({msg: "Token valid", user: req.auth})
})

app.get("/infouser", requireAuth, (req, res) => {
  const uid = req.auth.id;
  db.query(
    "SELECT nume, prenume FROM users WHERE id = ?",
    [uid],
    (err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ msg: "User not found" });
      }

      const { nume, prenume } = results[0];
      res.json({ nume, prenume });
    }
  );
});

app.post("/checkout", async (req, res) => {
  let userid = null;
  const { produse, discount, total, livrare } = req.body;
  const authHeader = req.headers["authorization"]
  const token = authHeader?.split(" ")[1]

  if(token){
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      userid = decoded.id
    }catch(err){
      console.warn("No token, guest detected")
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
    apt
  } = livrare;

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
    const values = produse.map((produs) => [orderId, produs.id, produs.name, produs.brand, produs.price]);

    await db.promise().query(
      `INSERT INTO order_items (order_id, product_id, product_name, product_brand, price)
       VALUES ?`,
      [values]
    );
    const prodList = produse.map(p => `- ${p.name} ${p.brand} (${p.price} lei)`).join("\n")
    const mail = {
      from: '"Void" <alice.fadel@ethereal.email>',
      to: email,
      subject: "Order confirmed",
      text: `
      Salut!
      Thank you for shopping with us! Here are the billing details:

      Order #${orderId}
      Products:
      ${prodList}

      Total: ${total} lei
      Discount: ${discount} lei
      Shipping to: ${address}${apt ? ", " + apt : ""}, ${city}, ${county}, ${postalCode}

      See you soon,
      Void
      `,
      html: `
      <h3>Hey</h3>
      <p>Thank you for shopping with us! Here are the billing details:</p>
      <p><b>Order #${orderId}</b></p>
      <ul>
        ${produse.map(p => `<li>${p.name} - ${p.price} lei</li>`).join("")}
      </ul>
      <p><b>Total:</b> ${total} lei<br/>
      <b>Discount:</b> ${discount} lei</p>
      <p><b>Address:</b> ${address}${apt ? ', ' + apt : ''}, ${city}, ${county}, ${postalCode}</p></br>
      <p style="color:#888">Void</p>
      `
    }
    await transporter.sendMail(mail)
    res.status(201).json({ msg: "Order processed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Order not processed" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
