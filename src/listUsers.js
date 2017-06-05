import jwt from 'jsonwebtoken';
import { config } from './config.js';

export const listUsers = (req, res, db) => {

  let token = req.query.token;
  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      console.log(err);
      res.status(400).json({success: false, msg: 'You cannot access the userlist'});

    } else {
      db.collection('Users').find({}).toArray()
      .then((result) => {
        // Checking if there are any users registered in case all the documents are dropped, while the sent out token is still valid
        result.length == 0 ? res.status(200).send({success: true, msg: 'There are no users registered.' }) : res.status(200).json({success: true, users: result});
      })

      .catch((err) => {
        console.log(err);
        res.status(500).json({success: false, msg: 'An error has been occured'});
      });
    }
  });

}
