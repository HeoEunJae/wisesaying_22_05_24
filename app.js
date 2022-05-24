import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const pool = mysql.createPool({
  host: "localhost",
  user: "hej89",
  password: "hej1022",
  database: "Wise_Saying",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
app.use(express.json());
const port = 3002;

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.get("/wise_saying", async (req, res) => {
  const [[rows]] = await pool.query(
    `
    SELECT * FROM WS
    ORDER BY RAND()
    LIMIT 1
    `
  );

  await pool.query(
    `
    UPDATE WS
    SET hit = hit + 1
    WHERE id = ?
    `,
    [rows.id]
  );
  res.json([rows]);
});

app.listen(port);
