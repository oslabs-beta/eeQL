const fileSetup = `
const supertest = require('supertest');
const app = require('../server/server.js'); 
const request = supertest(app);
jest.useFakeTimers();
`


RestTestCreation = (state) => {
  `test('Gets html from root page', async (done) => {
    const response = await request.get('/').set({});
    expect(response.status).toBe(200);
    return done();
  });`

`test('Gets html from root page', async (done) => {
  const response = await request.get('/').set({});
  expect(response.status).toBe(200);
  return done();
});`

  const 

  `describe( ${test}, ()=>{
    it (${test.expectedRes}, (done) => {
       //request
       request(${activePort})
        //post method
        .post(${test.serverApp})
        //send  method
        .send(value is equivalent to ${test})
        //expect method
        .expect(res.status).to.be.equal(200)
        //done method
        .done()
    })
  })`



  return fileSetup + 
}

  export default RestTestCreation;