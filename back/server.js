import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

connection.connect((err) => {
  if (err) {
    console.log("DB error: ", err);
  } else {
    console.log("Connected to db");
  }
});

//REGISTER
app.post("/register", (req, res) => {
  const { email, pass, stradaNr, codPostal, oras, judet, nrTel } = req.body;
  if (!email || !pass || !stradaNr || !codPostal || !oras || !judet || !nrTel) {
    return res.status(400).json({ message: "Details required" });
  }

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      } else if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hPass = await bcrypt.hash(pass, 10);
      connection.query(
        "INSERT INTO users (email, user_pass, strada_nr, cod_postal, oras, judet, telefon) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [email, hPass, stradaNr, codPostal, oras, judet, nrTel],
        (err) => {
          if (err) {
            console.error("err:", err);
            return res.status(500).json({ message: "Error creating user" });
          }
          res.status(201).json({ message: "User created" });
        }
      );
    }
  );
});

//LOGIN
app.post("/login", (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ message: "Email and pass required" });
  }

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      if (results.length === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const user = results[0];
      const match = await bcrypt.compare(pass, user.user_pass);

      if (match) {
        res.json({ message: "Login successful" });
      } else {
            res.status(400).json({ message: "Invalid credentials" });
      }
    }
  );
});

app.get("/api/verify", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: "Token missing"});
    }try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.json({message: "Token valid", user: decoded})
    }catch(err){
        res.status(401).json({message:"Invalid token"})
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
