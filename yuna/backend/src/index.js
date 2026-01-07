import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const dbConfig = {
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "app",
  password: process.env.DB_PASSWORD || "app",
  database: process.env.DB_NAME || "appdb",
};

let pool;

async function initDb() {
  pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
  });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS counter (
      id INT PRIMARY KEY,
      value INT NOT NULL
    )
  `);

  await pool.query(`
    INSERT INTO counter (id, value)
    VALUES (1, 0)
    ON DUPLICATE KEY UPDATE id = id
  `);

  console.log("✅ MySQL initialized");
}

app.get("/api/count", async (req, res) => {
  const [rows] = await pool.query("SELECT value FROM counter WHERE id=1");
  res.json({ value: rows?.[0]?.value ?? 0 });
});

app.post("/api/count/delta", async (req, res) => {
  const delta = Number(req.body?.delta);
  if (![1, -1].includes(delta)) {
    return res.status(400).json({ error: "delta must be 1 or -1" });
  }

  await pool.query("UPDATE counter SET value = value + ? WHERE id=1", [delta]);
  const [rows] = await pool.query("SELECT value FROM counter WHERE id=1");
  res.json({ value: rows[0].value });
});

app.get("/health", (req, res) => res.send("ok"));

initDb()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => console.log(`✅ API on :${PORT}`));
  })
  .catch((e) => {
    console.error("❌ DB init failed:", e);
    process.exit(1);
  });
