import express from "express";

import { registerUser } from "./registerUser.js";
import { listUsers } from "./listUsers.js";

const router = express.Router();

export const apiRouter = (db) => {
  router.get('/', (req, res) => {
    res.send('Server is working!');
  });

  router.post('/registration', (req, res) => {
    registerUser(req, res, db);
  });

  router.get('/users', (req, res) => {
    listUsers(req, res, db);
  })

  return router;
}