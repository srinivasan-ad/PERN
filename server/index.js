const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO studentusers (name, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      console.error(err.message);
      res.status(409).json({ error: "User already exists" });
    } else {
      console.log("Server error: " + err);
      res.status(500).send("Server Error");
    }
  }
});
app.post('/login', async (req,res)=>{
  try{
const {username,password} = req.body
const checkUser = await pool.query(
  "SELECT * FROM studentusers WHERE name = $1",[username]
);
if(checkUser.rows.length === 0){
 return res.status(404).json({error: 'User not found'})
}
const user = checkUser.rows[0];
if(user.password !== password){
return res.status(401).json({error: 'Incorrect password'})
}
return res.status(200).json({message : 'Logged in successfully'})
}
catch(err){
  console.error(err);
  return res.status(500).json({error : 'Server error'})
}})
