import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to my fullstack application')
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(async () => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message)
  })