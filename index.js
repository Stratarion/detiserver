
import express from 'express';
import cors from 'cors';

import * as path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import defaultHeaders from "./middleware/headers.js";
import userRouter from "./routes/user.js";
import organisationsRoutes from "./routes/organisations.js";
import uploadRouter from "./routes/upload.js";
import reviewRouter from "./routes/reviews.js";
import servicesRouter from "./routes/services.js";
import scheduleRouter from "./routes/schedule.js";
import bidsRouter from "./routes/bids.js";
import db from './models/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(multer().any());
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(defaultHeaders);
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/organisations', organisationsRoutes);
app.use('/user', userRouter);
app.use('/upload', uploadRouter);
app.use('/reviews', reviewRouter);
app.use('/services', servicesRouter);
app.use('/schedule', scheduleRouter);
app.use('/bids', bidsRouter);
const PORT = process.env.PORT|| 5000;

db.sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});