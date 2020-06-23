import should from 'should';
import request from 'supertest';
import mongoose from 'mongoose';
import Book from '../models/bookModel.js';
import './testEnv.js';
import app from '../app.js';

const agent = request.agent(app);

describe('Book Crud Test', () => {
  it('should allow a book to be posted and return read and __it', (done) => {
    const bookPost = { title: 'My book', author: 'Patrick', genre: 'Fiction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results);
        // results.body.read.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
