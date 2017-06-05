import request from 'supertest';
import { config } from '../config.js';
import mongo from 'mongodb';
import jwt from 'jsonwebtoken';


const URL = `${config.serverAddress}:${config.port}`
let baseHeader = {'Accept': 'application/json', 'Content-Type': 'application/json'};
let db;

let testUser = {
  name: 'Jhonny Test',
  email: 'jhonny.test@test.com'
};

let invalidEmail = {
  name: 'Jhonny Test',
  email: 'jhonny.test@1.7'
};


describe('POST /registration : Registering a new user', () => {

  // connecting to the database and removing the test data if it is there
  before((done) => {
    mongo.connect(config.mongodbURL)
    .then((database) => {
      db = database.collection('Users');
    })
    .then(() => {
      db.deleteMany({email: testUser.email})
      .then((result) => {
        console.log("Test documents are removed before the start of the test");
        done();
      })
      .catch((err) => {
        done(err);
      })
    })
    .catch((err) => {
      mongo.cose();
      done(err);
    })
  });

// TEST CASES
  it('should send back an error message, when there is no credentials sent in the request', (done) => {
    request(URL)
    .post('/registration')
    .set(baseHeader)
    .send({})
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      done(err);
    });
  });

  it('should send back an error message, when only the name is sent in the request', (done) => {
    request(URL)
    .post('/registration')
    .set(baseHeader)
    .send({name: testUser.name})
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      done(err);
    });
  });

  it('should send back an error message, when only the email is sent in the request', (done) => {
    request(URL)
    .post('/registration')
    .set(baseHeader)
    .send({email: testUser.email})
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      done(err);
    });
  });

  it('should send back an error message, when the provided e-mail is not in valid e-mail formation', (done) => {
    request(URL)
    .post('/registration')
    .set(baseHeader)
    .send(invalidEmail)
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      done(err);
    });
  });

  it('should send back a success message if the credentials are proper and the document is created in the DB', (done) => {
    request(URL)
    .post('/registration')
    .set(baseHeader)
    .send(testUser)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      db.find(testUser).toArray()
      .then((result) => {
        if (result.length == 0) {
          done(new Error('Document is not created in the DB'));
        } else {
          done(err);
        }
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});

describe('GET /users : Asking for the users list', () => {

  // Remove every test document from the collection at the end of the test
  after((done) => {
    db.deleteMany(testUser)
    .then((result) => {
      console.log('Removed every test document from DB. Test is ended');
      done();
    })
    .catch((err) => {
      done(err);
    })
  });

// TEST CASES
  it('should send back an error message, when there is no token sent in the query', (done) => {
    request(URL)
    .get('/users')
    .set(baseHeader)
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      done(err);
    });
  });

  it('should send back an error message, when the provided token is not valid', (done) => {
    request(URL)
    .get('/users?token=invalidToken')
    .set(baseHeader)
    .expect(400)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      done(err);
    });
  });

  it('should send back the list of users when the provided token is valid', (done) => {

    const token = jwt.sign(testUser, config.secret, {
      expiresIn: config.tokenExpiration
    });

    request(URL)
    .get(`/users?token=${token}`)
    .set(baseHeader)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      done(err);
    });
  });
});
