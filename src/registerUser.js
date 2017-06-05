import { generateRandomString } from './helper/generateRandomString.js';
import { sendMail } from './helper/mailSetup.js';
import { config } from './config.js';

export const registerUser = (req, res, db) => {

  let newUser = {
    name: req.body.name,
    email: req.body.email
  };

  db.collection('Users').find({email: newUser.email}).toArray()
  .then((result) => {
    if (result.length == 0) {
      db.collection('Users').insert(newUser)
      .then(() => {
        sendMail(newUser, `${config.serverAddress}/users`);
        res.status(200).json({msg: `User ${req.body.name} has been added to the database. Thank you for registering`});
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
      })
    } else {
      res.status(400).json({msg: 'E-mail address is already registered.'});
    }
  })

}