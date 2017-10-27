const supertest = require('supertest')

// This agent refers to PORT where the program is running.

const server = supertest.agent('http://35.188.157.198:3000')

// UNIT test begin
/*eslint-disable */
describe('SAMPLE unit test', function () {

  // #1 should return home page
  it('should return home page', function (done) {
    // calling home page
    server
      .get('/documentation')
      .expect('Content-type', /text/)
      .expect(200) // THis is HTTP response
      .end((err, res) => {
        res.status.should.equal(200)
        done()
      })
  })

})
