const supertest = require('supertest')

const server = supertest.agent('http://35.188.157.198:3000')

/*eslint-disable */
describe('SAMPLE unit test', function () {

  it('should return home page', function (done) {
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
