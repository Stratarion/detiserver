
import express from 'express';
import cors from 'cors';

import * as path from 'path';
import { fileURLToPath } from 'url';
import defaultHeaders from "./middleware/headers.js";
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import organisationsRoutes from "./routes/organisations.js";
import uploadRouter from "./routes/upload.js";
import workerRouter from "./routes/worker.js";
import lessonRouter from "./routes/lesson.js";
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
app.use('/organisations', organisationsRoutes);
app.use('/worker', workerRouter);
app.use('/user', userRouter);
app.use('/lesson', lessonRouter);
app.use('/upload', uploadRouter);
const PORT = process.env.PORT|| 5000;

db.sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});