import { generateRandomString } from './helper/generateRandomString.js';
import { sendMail } from './helper/mailSetup.js';
import { config } from './config.js';
import jwt from 'jsonwebtoken';
import validator from 'email-validator';

// I'm using a simple email validator module, however a custom regexp could be written in case the project would need it.
// For this, I found it easier to use a highly used validator instead of writing an almost similar, but potentially faulty validator

export const registerUser = (req, res, db) => {


  if ((req.body.name && req.body.email) && validator.validate(req.body.email)) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
    };

    // I consider the e-mail as a unique entry, therefore I must check for duplication
    db.collection(config.collectionName).find({email: newUser.email}).toArray()
    .then((result) => {
      if (result.length == 0) {

        db.collection(config.collectionName).insert(newUser)
        .then(() => {
          const token = jwt.sign(newUser, config.secret, {
            expiresIn: config.tokenExpiration
          });
          sendMail(newUser, `http://${config.serverAddress}:${config.port}/users?token=${token}`);
          res.status(200).json({success: true, msg: `User ${req.body.name} has been added to the database. An e-mail has been sent to the given address with a link to list the users.`});
        })

        .catch((err) => {
          console.log(err);
          res.status(500).json({success: false, msg: 'An error has been occured'});
        })

      } else {
        res.status(400).json({success: false, msg: 'E-mail address is already registered.'});
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({success: false, msg: 'An error has been occured'});
    })

  } else {
    res.status(400).json({success: false, msg: 'Valid e-mail address and name is mandatory for the registration'});
  }
}