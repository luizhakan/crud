import fs from "fs";
import { db } from "./db/sequelize";
import { People } from "./schema/People";
import express from "express";

const app = express();

app.use(express.json()); // Add express.json middleware

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    res.send(data);
  });
});

app.post("/create", (req, res) => {
  const { name, age } = req.body;

  // Validations

  if (!name || !age) {
    res.status(400).send("Name and age are required");
    return;
  } else if (isNaN(age)) {
    res.status(400).send("Age must be a number");
    return;
  } else {
    People.create({ name, age }).then((people) => {
      res.send(people);
    });
  }
});

// Perform database query

async function startServer() {
  try {
    await db.sync();
    await db.authenticate();
    console.log("Connection has been established successfully.");

    const people = await People.findAll();
    const peoples = [...people];
    console.log(peoples);

    // fs.writeFile("./db.json", JSON.stringify(peoples), (err) => {
    //   if (err)
    //     throw err;
    // })

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.log("Error connecting to the database:", error);
  }
}

startServer();
