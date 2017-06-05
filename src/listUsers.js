import jwt from 'jsonwebtoken';
import { config } from './config.js';

export const listUsers = (req, res, db) => {

  let token = req.query.token;
  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      console.log(err);
      res.status(400).json({success: false, msg: 'Invalid token'});

    } else {
      db.collection('Users').find({}).toArray()
      .then((result) => {
        result.length == 0 ? res.status(200).send({success: true, msg: 'There are no users registered.' }) : res.status(200).json({success: true, users: result});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Something went wrong'});
      });
    }
  });

}
