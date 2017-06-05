# RS JSON HTTP API

## Installation

1. Check out the repo
2. Run `npm install`
3. Run `npm run start` This will compile the files and start the server.
4. For runnning the tests you can run `npm run test`.

Please note, that the config.js file is not included in the repo.

## Stack(ish)

Basic ES6 syntax parts (arrow functions, promises, template literals) compiled with Babel

- NodeJs
- ExpressJs
- Mongodb database, database as service on mLab.com
- Json web token for auth
- Nodemailer for sending out e-mails

For the testing:
- Mocha
- Supertest

## Why?
**Mongodb**

I had some experience with it, and the simple structure of the required data storing made using mongo sufficent for the task.
In case of need for more complicated database, or even relational queries and reports, some kind of relational database would be a better choice.


**Jsonwebtoken**

Widely used solution for generating and verifying json web tokens. I found it easy to use and had all the neccessary features.


**Nodemailer**

Sending e-mails out is a common task, however I've never done before. After a search I found this a proper lib, since it has no dependencies, the documentation is good and it is widely used.


**Mocha and Supertest**

Widely used solutions for testing APIs. Mocha is easy to use, Supertest let me create HTTP calls with ease, and with the provided callbacks, it is easy to manipulate or validate the responses.

## Room to improve in the future (AKA TODO or what more can be done? :D) without any order
- Implementing a proper logger and removing console.logs where possible (e.g. Winston)
- Encrypting the database entries (e.g e-mail addresses)
- Creating a separate collection for the tests
- Proper documentation (e.g JSDoc)
- Implementing the front end
- Adding registration and proper authentication
- Experimenting with relational databases?
