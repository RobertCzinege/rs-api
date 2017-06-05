import express from "express";

import { registerUser } from "./registerUser.js";
import { listUsers } from "./listUsers.js";

const router = express.Router();

export const apiRouter = (db) => {
  //Registering User
  router.post('/registration', (req, res) => {
    registerUser(req, res, db);
  });

  //Get the userlist
  router.get('/users', (req, res) => {
    listUsers(req, res, db);
  })

  return router;
}