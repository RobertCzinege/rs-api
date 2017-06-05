import { generateRandomString } from './helper/generateRandomString.js';
import { sendMail } from './helper/mailSetup.js';
import { config } from './config.js';
import jwt from 'jsonwebtoken';

export const registerUser = (req, res, db) => {

  let newUser = {
    name: req.body.name,
    email: req.body.email,
  };

  db.collection('Users').find({email: newUser.email}).toArray()
  .then((result) => {
    if (result.length == 0) {
      db.collection('Users').insert(newUser)
      .then(() => {

        const token = jwt.sign(newUser, config.secret, {
          expiresIn: '1h'
        });

        sendMail(newUser, `${config.serverAddress}:${config.port}/users?token=${token}`);
        res.status(200).json({success: true, msg: `User ${req.body.name} has been added to the database. An e-mail has been sent to the given address with a link to list the users.`});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({success: false, msg: 'Something went wrong'});
      })
    } else {
      res.status(400).json({success: false, msg: 'E-mail address is already registered.'});
    }
  })

}