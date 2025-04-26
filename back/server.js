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


const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
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
    return res.status(400).json({ message: "Details required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      } else if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hPass = await bcrypt.hash(pass, 10);
      db.query(
        "INSERT INTO users (email, user_pass, strada_nr, cod_postal, oras, judet, telefon, nume, prenume) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [email, hPass, stradaNr, codPostal, oras, judet, nrTel, nume, prenume],
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

  db.query(
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
        const token = jwt.sign(
          {id: user.id, email: user.email},
          process.env.JWT_SECRET,
          {expiresIn: "15m"}
        )
        res.json({message: "Login succesful", token})

      } else {
            res.status(400).json({ message: "Invalid credentials" });
      }
    }
  );
});

app.get("/verify", (req, res) => {
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

app.get("/infouser", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]
  if(!token){
    return res.status(401).json({message: "Token missing"})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const uid = decoded.id;

    db.query(
      "SELECT nume, prenume from users WHERE id = ?",
      [uid],
      (err, results) => {
        if(err){
          return res.status(500).json({message: "Server error"})
        }else if(results.length === 0){
          return res.status(404).json({message: "UID not found"})
        }
        const {nume, prenume} = results[0]
        res.json({nume, prenume})
      }
    )
  } catch (err) {
    res.status(401).json({ message: "Invalid token" })}
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
