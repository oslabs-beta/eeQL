
  const supertest = require('supertest');
  const app = require('undefined'); 
  const request = supertest(app);
  jest.useFakeTimers();  
  
  test('testing', async (done) => {
    const response = await request
    .undefined('/test')
    
    
  expect().toBe(string);
  return done();
  });
