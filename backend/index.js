import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

const corsConfin = {
  origin: 'http://localhost:5173',
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}

app.use(cors(corsConfin));

app.get('/', (_, response) => {
  response.status(234).send('Welcome to my fullstack application')
})

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('db connected')
    app.listen(PORT, () => {
      console.log(`App is listening on: ${PORT}`);
    })
  })
  .catch((err) => {
    console.log(err.message)
  })



