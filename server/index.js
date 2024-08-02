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
    const sqlQuery = `INSERT INTO studentusers (name, password) VALUES('${username}', '${password}') RETURNING *;\n`;
    fs.appendFile("dml.sql", sqlQuery, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
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
    const sqlQuery = `SELECT * FROM studentusers WHERE name = '${username}';\n`;
    fs.appendFile("dml.sql", sqlQuery, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
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
    const sqlQuery = `INSERT INTO polls (user_name, question, option1, option2, option3) VALUES ('${username}', '${question}','${option1}','${option2}', '${option3}') RETURNING *;\n`;
    fs.appendFile("dml.sql", sqlQuery, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/formpolls", async (req, res) => {
  try {
    const { username, question, option1, option2, option3 } = req.body;
    const newPoll = await pool.query(
      "INSERT INTO form_polls (user_name, question) VALUES ($1, $2) RETURNING *",
      [username, question]
    );
    res.status(201).json(newPoll.rows[0]);
    const sqlQuery = `INSERT INTO form_polls (user_name, question) VALUES ('${username}', '${question}') RETURNING *;\n`;
    fs.appendFile("dml.sql", sqlQuery, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/polls/:username/unanswered", async (req, res) => {
  const { username } = req.params;
  try {
    const pollResults = await pool.query(
      `SELECT p.id, p.question
       FROM polls p
       WHERE p.id NOT IN (
         SELECT r.poll_id FROM responses r
         WHERE r.user_name = $1
       )`,
      [username]
    );
    const sqlQuery =   `SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '${username}'
    );\n`;
    fs.appendFile("dml.sql", sqlQuery, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
    const formPollResults = await pool.query(
      `SELECT p.id, p.question
       FROM form_polls p
       WHERE p.id NOT IN (
         SELECT r.poll_id FROM form_responses r
         WHERE r.user_name = $1
       )`,
      [username]
    );
    const sqlQuery2 =   `SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '${username}'
    );\n`;
    fs.appendFile("dml.sql", sqlQuery2, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
    const combinedResults = [...pollResults.rows, ...formPollResults.rows];
    res.json(combinedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/polls/:pollId", async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await pool.query("SELECT * FROM polls WHERE id = $1", [pollId]);
    const form_poll = await pool.query("SELECT * FROM form_polls WHERE id = $1", [pollId]);

    if (poll.rows.length > 0) {
      const pollData = { ...poll.rows[0], source: 'polls' };
      res.json(pollData);
      const sqlQuery = `SELECT * FROM polls WHERE id = ${pollId}
      ;\n`;
      fs.appendFile("dml.sql", sqlQuery, (err) => {
        if (err) {
          console.error("Error writing to dml.sql:", err.message);
        }
      });
    } else if (form_poll.rows.length > 0) {
      const formPollData = { ...form_poll.rows[0], source: 'form_polls' };
      res.json(formPollData);
      const sqlQuery = `SELECT * FROM form_polls WHERE id = ${pollId}
      ;\n`;
      fs.appendFile("dml.sql", sqlQuery, (err) => {
        if (err) {
          console.error("Error writing to dml.sql:", err.message);
        }
      });
    } else {
      res.status(404).json({ error: "Poll not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});




app.post("/formresponses", async (req, res) => {
  const { pollId, username, response } = req.body;
  try {
    const user = await pool.query(
      "SELECT name FROM studentusers WHERE name = $1",
      [username]
    );
    const sqlQuery = `SELECT name FROM studentusers WHERE name = ${username}
      ;\n`;
      fs.appendFile("dml.sql", sqlQuery, (err) => {
        if (err) {
          console.error("Error writing to dml.sql:", err.message);
        }
      });
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const newResponse = await pool.query(
      "INSERT INTO form_responses (poll_id, user_name, response) VALUES ($1, $2, $3) RETURNING *",
      [pollId, username, response]
    );
    res.status(201).json(newResponse.rows[0]);
    const sqlQuery2 = `INSERT INTO form_responses (poll_id, user_name, response) VALUES (${pollId}, '${username}','${response}') RETURNING *
  ;\n`;
  fs.appendFile("dml.sql", sqlQuery2, (err) => {
    if (err) {
      console.error("Error writing to dml.sql:", err.message);
    }
  });
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
    const sqlQuery = `SELECT name FROM studentusers WHERE name = '${username}' 
  ;\n`;
  fs.appendFile("dml.sql", sqlQuery, (err) => {
    if (err) {
      console.error("Error writing to dml.sql:", err.message);
    }
  });
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const newResponse = await pool.query(
      "INSERT INTO responses (poll_id, user_name, response) VALUES ($1, $2, $3) RETURNING *",
      [pollId, username, response]
    );
    res.status(201).json(newResponse.rows[0]);
    const sqlQuery2 = `INSERT INTO responses (poll_id, user_name, response) VALUES (${pollId}, '${username}','${response}') RETURNING *
  ;\n`;
  fs.appendFile("dml.sql", sqlQuery2, (err) => {
    if (err) {
      console.error("Error writing to dml.sql:", err.message);
    }
  });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/polls/:username/created", async (req, res) => {
  const { username } = req.params;
  try {
    const polls = await pool.query(
      "SELECT id, question, 'polls' as source FROM polls WHERE user_name = $1",
      [username]
    );
    const sqlQuery = `SELECT id, question, 'polls' as source FROM polls WHERE user_name = '${username}' RETURNING *
  ;\n`;
  fs.appendFile("dml.sql", sqlQuery, (err) => {
    if (err) {
      console.error("Error writing to dml.sql:", err.message);
    }
  });
    const form_polls = await pool.query(
      "SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = $1",
      [username]
    );
    const sqlQuery2 = `SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '${username}' RETURNING *
  ;\n`;
  fs.appendFile("dml.sql", sqlQuery2, (err) => {
    if (err) {
      console.error("Error writing to dml.sql:", err.message);
    }
  });
    const combinedPolls = [...polls.rows, ...form_polls.rows];
    res.json(combinedPolls);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/download/:pollId", async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await pool.query("SELECT * FROM polls WHERE id = $1", [pollId]);
    const formPoll = await pool.query("SELECT * FROM form_polls WHERE id = $1", [pollId]);

    if (poll.rows.length === 0 && formPoll.rows.length === 0) {
      return res.status(404).json({ error: "Poll not found" });
    }

    const doc = new PDFDocument();
    const filePath = `./poll_results_${pollId}.pdf`;
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    if (poll.rows.length > 0) {
      const pollData = poll.rows[0];
      doc.fontSize(20).text(`Poll Results: ${pollData.question}`, { align: "center" });
      doc.moveDown();

      const responses = await pool.query("SELECT * FROM responses WHERE poll_id = $1", [pollId]);
      responses.rows.forEach((response) => {
        doc.fontSize(14).text(`Username: ${response.user_name}`);
        doc.fontSize(14).text(`Response: ${response.response}`);
        doc.moveDown();
      });
    } else if (formPoll.rows.length > 0) {
      const formPollData = formPoll.rows[0];
      doc.fontSize(20).text(`Form Poll Results: ${formPollData.question}`, { align: "center" });
      doc.moveDown();

      const formResponses = await pool.query("SELECT * FROM form_responses WHERE poll_id = $1", [pollId]);
      formResponses.rows.forEach((response) => {
        doc.fontSize(14).text(`Username: ${response.user_name}`);
        doc.fontSize(14).text(`Response: ${response.response}`);
        doc.moveDown();
      });
    }

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

app.delete("/delete/:pollId", async (req, res) => {
  const { pollId } = req.params;
  const { source } = req.body;
  try {
    if (source === "polls") {
      await pool.query("DELETE FROM responses WHERE poll_id = $1", [pollId]);
      const poll = await pool.query("DELETE FROM polls WHERE id = $1 RETURNING *", [pollId]);
      const sqlQuery = `DELETE FROM responses WHERE poll_id = ${pollId} RETURNING *
    ;\n`;
    fs.appendFile("dml.sql", sqlQuery, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
      const sqlQuery1 = `DELETE FROM polls WHERE poll_id = ${pollId} RETURNING *
    ;\n`;
    fs.appendFile("dml.sql", sqlQuery1, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
      if (poll.rows.length > 0) {
        return res.status(200).json({ message: "Poll deleted successfully" });
      }
    } else if (source === "form_polls") {
      await pool.query("DELETE FROM form_responses WHERE poll_id = $1", [pollId]);
      const formPoll = await pool.query("DELETE FROM form_polls WHERE id = $1 RETURNING *", [pollId]);
      const sqlQuery = `DELETE FROM form_responses WHERE poll_id = ${pollId} RETURNING *
    ;\n`;
    fs.appendFile("dml.sql", sqlQuery, (err) => {
      if (err) {
        console.error("Error writing to dml.sql:", err.message);
      }
    });
    const sqlQuery1 = `DELETE FROM form_polls WHERE poll_id = ${pollId} RETURNING *
  ;\n`;
  fs.appendFile("dml.sql", sqlQuery1, (err) => {
    if (err) {
      console.error("Error writing to dml.sql:", err.message);
    }
  });
      if (formPoll.rows.length > 0) {
        return res.status(200).json({ message: "Form poll deleted successfully" });
      }
    }
    res.status(404).json({ error: "Poll not found" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});
