
  const supertest = require('supertest');
  const app = require('/Users/ramtin/Desktop/eeQL/babel.config.js'); 
  const request = supertest(app);
  jest.useFakeTimers();  
  
  test('Frank', async (done) => {
    const response = await request
    .undefined('/frank')
    
    
  expect().toBe(string);
  return done();
  });
