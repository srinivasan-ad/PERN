const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO studentusers (name, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    if (err.code === '23505') { 
      console.error(err.message);
      res.status(409).json({ error: 'User already exists' });
    } else {
      console.log('Server error: ' + err);
      res.status(500).send("Server Error");
    }
  }
});
