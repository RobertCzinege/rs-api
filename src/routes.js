import express from "express";

const router = express.Router();

export const apiRouter = () => {
  router.get('/', (req, res) => {
    res.send('Server is working!');
  })

  return router;
}