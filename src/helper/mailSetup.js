import nodemailer from 'nodemailer';
import { config } from '../config.js';

export const sendMail = (to, link) => {

  let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
          user: config.emailCreds.user,
          pass: config.emailCreds.pass
      }
  });

  let mailOptions = {
      from: `"Super User List" ${config.emailCreds.user}`,
      to: to.email,
      subject: 'List the users now!',
      text: `Dear ${to.name}, Thank you for registering to our service! You can list the users on this link: ${link}`,
      html: `<h1>Dear ${to.name},</h1>
            <p>Thank you for registering to our service!</p>
            <p>You can list the users on this link: ${link}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log(`Message sent: ${info.messageId}  ${info.response}`);
  });

};
