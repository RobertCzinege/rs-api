import express from 'express';
import bodyParser from 'body-parser';

import { apiRouter } from './routes.js';

const app = express();

app.use(bodyParser.json());
app.use(apiRouter());

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})