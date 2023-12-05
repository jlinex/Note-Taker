import pkg from 'express';
const { Router } = pkg;
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
const router = Router();

// path to json file
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "./db/db.json");

let db = [];
  // trying to read the file
  try {
    db = JSON.parse(await readFile(dbPath, 'utf-8'));
    } catch (e) {}

// get request for notes
router.get("/notes", (req, res) => {
  res.json(db);
});

// post request for notes
router.post("/notes", async (req, res) => {
  const { title, text } = req.body;
  if (typeof title !== "string" || typeof text !== "string")
    return res.status(400).send();
  if (title.length === 0 || text.length === 0) return res.status(400).send();

  db.push({ title, text });

  try {
    await writeFile(dbPath, JSON.stringify(db));
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send("Error");
  }
});

export default router;