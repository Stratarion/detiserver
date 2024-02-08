
import express from 'express';
import cors from 'cors';

import * as path from 'path';
import { fileURLToPath } from 'url';
import defaultHeaders from "./middleware/headers.js";
import postRoutes from './routes/posts.js';
import gartensRoutes from './routes/gartens.js';
import userRouter from "./routes/user.js";
import uploadRouter from "./routes/upload.js";
import { findAllTutorial, createTutorial } from './controllers/tutorial.controller.js';
import db from './models/index.js';


const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(defaultHeaders);
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/posts', postRoutes);
app.use('/gartens', gartensRoutes);
app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.get("/tutorials", findAllTutorial);
app.post('/tutorials/create', createTutorial);

const PORT = process.env.PORT|| 5000;

db.sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});