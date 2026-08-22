
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require('dotenv').config();
const fs = require("fs/promises");


const url = process.env.DB_URL // `mongodb://admin:pass123@localhost:27017`;
const dbName = "user_db";



const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://188.40.180.113:3000"
  ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;

MongoClient.connect(url)
  .then((client) => {
    console.log("✅ Connected to MongoDB");

    db = client.db(dbName);

    app.listen(3001, () => {
      console.log("🚀 Server running on http://localhost:3001");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });


app.get("/users", async (req, res) => {
  try {
    if (!db) return res.status(500).send("DB not ready");

    const users = await db.collection("users").find().toArray();
    res.send({ data: users, api: process.env.API_NAME });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.get("/proccessData", async (req, res) => {

    setTimeout(()=>{
          res.send({ data: {status : "completed" } });

    }, 7000)
});

app.get("/bigData", async (req, res) => {
  try {
    const data = await fs.readFile("./10m.json", "utf8");

    setTimeout(() => {
      res.json({
        data: {
          status: "completed",
          data: JSON.parse(data)
        }
      });
    }, 7000);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Could not read A.json"
    });
  }
});

app.post("/users", async (req, res) => {
  console.log(req.body.name)
  try {
    if (!db) return res.status(500).send("DB not ready");

    if (!req.body.name)
      return res.status(400).send("Name is required");

    const newUser = { name: req.body.name };

    await db.collection("users").insertOne(newUser);

    res.status(201).send({...newUser, api: process.env.API_NAME });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});



app.delete("/users/:name", async (req, res) => {
  try {
    if (!db) return res.status(500).send("DB not ready");

    const result = await db
      .collection("users")
      .deleteOne({ name: req.params.name });

    if (result.deletedCount === 0)
      return res.status(404).send("User not found");

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});