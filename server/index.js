const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db');
app.use(cors());
app.use(express.json())
app.listen("5000", () => {
  console.log("server has started on port 5000");
});
app.post('/login',async (req,res)=>{
  try {
const {name,password} = req.body;
const newUser = await pool.query(
  "INSERT INTO studentusers (name,password) VALUES($1,$2)",
  [name,password]
);
res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})