const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '1111',
    database: process.env.DB_NAME || 'counter_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        return;
    }
    console.log('>> Connected to MySQL database');
    
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS counts (
            id INT PRIMARY KEY,
            val INT NOT NULL
        )
    `;
    
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('!! Table creation failed:', err.message);
        } else {
            console.log('>> Table "counts" is ready');
            db.query('INSERT IGNORE INTO counts (id, val) VALUES (1, 0)', (err) => {
                if (err) console.error('!! Initial data insert failed:', err.message);
                else console.log('>> Initial data checked');
            });
        }
    });
});

// GET: 현재 카운트 가져오기
app.get('/api/count', (req, res) => {
    db.query('SELECT val FROM counts WHERE id = 1', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json({ count: results[0].val });
    });
});

// POST: 카운트 증가/감소
app.post('/api/count', (req, res) => {
    const { type } = req.body;
    const change = type === 'INC' ? 1 : -1;
    
    db.query('UPDATE counts SET val = val + ? WHERE id = 1', [change], (err) => {
        if (err) return res.status(500).json(err);
        db.query('SELECT val FROM counts WHERE id = 1', (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({ count: results[0].val });
        });
    });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is running and connected to DB!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});