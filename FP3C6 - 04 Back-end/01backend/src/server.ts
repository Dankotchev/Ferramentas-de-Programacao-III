import express from 'express';
import './database/connection';

const PORT = process.env.PORT || 3333;

const app = express();

app.listen(PORT as number, () =>
  console.log(`Listening on all interfaces:${PORT}`)
);
