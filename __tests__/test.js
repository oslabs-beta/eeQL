
  const supertest = require('supertest');
  const app = require('/Users/ramtin/Desktop/eeQL/babel.config.js'); 
  const request = supertest(app);
  jest.useFakeTimers();  
  
  test('asdasdasd', async (done) => {
    const response = await request
    .undefined('asdasdasd')
    
    
  expect().toBe(asdasdasd);
  return done();
  });
