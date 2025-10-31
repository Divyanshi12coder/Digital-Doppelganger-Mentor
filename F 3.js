// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const db = new Pool({ connectionString: process.env.DATABASE_URL });

app.post('/api/mentor', async (req, res) => {
  const { message } = req.body;
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [{ role: 'user', content: message }]
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  });

  res.json({ reply: response.data.choices[0].message.content });
});

app.get('/api/progress', async (req, res) => {
  const result = await db.query('SELECT * FROM progress ORDER BY date ASC');
  res.json(result.rows);
});

app.listen(5000, () => console.log('Server running on port 5000'));