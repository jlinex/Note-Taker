import express from 'express';
import apiRoutes from './routes/apiRoutes.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api route
app.use('/api', apiRoutes);

app.get('/', (req, res) =>
  res.sendFile(path.join(getDirname(import.meta), './public/index.html'))
);

app.get('notes', (req, res) =>
  res.sendFile(path.join(getDirname(import.meta), './public/notes.html'))
);

// listens for application on local server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);