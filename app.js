import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bookRouterImport from './routes/bookRouter.js';
import Book from './models/bookModel.js';

const app = express();
const db = mongoose.connect('mongodb://localhost/bookApi');
const port = process.env.PORT || 3000;
const bookRouter = bookRouterImport(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
