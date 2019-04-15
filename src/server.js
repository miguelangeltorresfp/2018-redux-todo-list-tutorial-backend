import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import './models/Todo';
import todos from './routes/todos';

const start = () => {
  if (!process.env.MONGO_URL) {
    throw new Error('No mongo url configured, set MONGO_URL env var');
  }
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
  });

  const app = express();
  app.use(morgan('combined'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //
  app.use(todos);

  app.use((err, req, res) => {
    const { message, stack } = err;
    res.status(500).send({ status: 'error', message, stack });
  });
  return app;
};

export default start;
