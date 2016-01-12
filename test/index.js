var request = require('supertest');
describe('milliseconds timstamp', function() {
  var server;
  beforeEach(function() {
    server = require('../index');
  });
  afterEach(function() {
    server.close();
  });
  it('responds to unix timestamps', function testUnix(done) {
    request(server)
      .get('/1450137600')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: 1450137600,
        natural: 'December 15th, 2015'
      }, done);
  });
  it('responds to natural timestamps', function testNatural(done) {
    request(server)
      .get('/December 15th, 2015')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: 1450137600,
        natural: 'December 15th, 2015'
      }, done);
  });
  it('responds with null to garbage', function testGarbage(done) {
    request(server)
      .get('/blah')
      .expect('Content-Type', /json/)
      .expect(200, {
        unix: null,
        natural: null
      }, done);
  });
});
