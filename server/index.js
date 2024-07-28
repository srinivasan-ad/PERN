const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PDFDocument = require("pdfkit");
const fs = require("fs");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server has started on port 5000");
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
      console.error("Server error: " + err.message);
      res.status(500).send("Server Error");
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await pool.query(
      "SELECT * FROM studentusers WHERE name = $1",
      [username]
    );
    if (checkUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = checkUser.rows[0];
    if (user.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({ message: "Logged in successfully", username });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/polls", async (req, res) => {
  try {
    const { username, question, option1, option2, option3 } = req.body;
    const newPoll = await pool.query(
      "INSERT INTO polls (user_name, question, option1, option2, option3) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, question, option1, option2, option3]
    );
    res.status(201).json(newPoll.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/polls/:username/unanswered", async (req, res) => {
  const { username } = req.params;
  try {
    const polls = await pool.query(
      `SELECT p.id, p.question
       FROM polls p
       WHERE p.id NOT IN (
         SELECT r.poll_id FROM responses r
         WHERE r.user_name = $1
       )`,
      [username]
    );
    res.json(polls.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/polls/:pollId", async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await pool.query("SELECT * FROM polls WHERE id = $1", [
      pollId,
    ]);
    res.json(poll.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/responses", async (req, res) => {
  const { pollId, username, response } = req.body;
  try {
    const user = await pool.query(
      "SELECT name FROM studentusers WHERE name = $1",
      [username]
    );
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const newResponse = await pool.query(
      "INSERT INTO responses (poll_id, user_name, response) VALUES ($1, $2, $3) RETURNING *",
      [pollId, username, response]
    );
    res.status(201).json(newResponse.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/polls/:username/created", async (req, res) => {
  const { username } = req.params;
  try {
    const polls = await pool.query(
      "SELECT id, question FROM polls WHERE user_name = $1",
      [username]
    );
    res.json(polls.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/download/:pollId", async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await pool.query("SELECT * FROM polls WHERE id = $1", [
      pollId,
    ]);
    const responses = await pool.query(
      "SELECT * FROM responses WHERE poll_id = $1",
      [pollId]
    );

    if (poll.rows.length === 0) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const doc = new PDFDocument();
    const filePath = `./poll_results_${pollId}.pdf`;
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc
      .fontSize(20)
      .text(`Poll Results: ${poll.rows[0].question}`, { align: "center" });
    doc.moveDown();

    responses.rows.forEach((response) => {
      doc.fontSize(14).text(`Username: ${response.user_name}`);
      doc.fontSize(14).text(`Response: ${response.response}`);
      doc.moveDown();
    });

    doc.end();

    stream.on("finish", () => {
      res.download(filePath, `poll_results_${pollId}.pdf`, (err) => {
        if (err) {
          console.error(err);
        }
        fs.unlinkSync(filePath);
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
