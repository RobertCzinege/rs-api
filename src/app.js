import express from 'express';
import bodyParser from 'body-parser';
import mongo from 'mongodb';

import { apiRouter } from './routes.js';
import { config } from './config.js';

const app = express();
app.use(bodyParser.json());

mongo.connect(config.mongodbURL)
  .then(db => {
    console.log('Connected to DB');
    app.use(apiRouter(db));
    })
  .catch((err) => {
    console.log(err);
    mongo.close();
  });

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
})

export const application = app;