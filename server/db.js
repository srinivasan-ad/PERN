const Pool = require("pg").Pool;
const pool = new Pool({
  user: "verbser",
  password: "Rahulla",
  host: "localhost",
  port: 5432,
  database: "login",
});
module.exports = pool;
