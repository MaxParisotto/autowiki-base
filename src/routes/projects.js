// src/routes/projects.js
import express from 'express';
import mysql from '../db/mysql.js';
import redis from '../db/redis.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cachedProjects = await redis.get('projects');
    if (cachedProjects) {
      return res.json(JSON.parse(cachedProjects));
    }

    const [rows] = await mysql.query('SELECT * FROM projects');
    await redis.set('projects', JSON.stringify(rows), { EX: 3600 }); // Cache for 1 hour

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;