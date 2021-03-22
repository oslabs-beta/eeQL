const RestTestCreation = (state) => {
  // Sample Representation of Test Output:
  `
  const supertest = require('supertest');
  const app = require('../server/server.js'); 
  const request = supertest(app);
  jest.useFakeTimers();  

  test('Gets html from root page', async (done) => {
    const response = await request
    .get('/')
    .set({});
    expect(response.status).toBe(200);
  return done();
  });`;

  const serverApp = state.serverApp;
  const expectedRes = state.expectedRes;
  const methodSelect = state.methodSelect;
  const desiredEndpoint = state.desiredEndpoint;
  const inputData =
    state.methodSelect === "POST" || state.methodSelect === "PUT"
      ? `.send(${state.inputData});`
      : "";
  const headerInfo = state.headerInfo ? `.set(${headerInfo})` : "";
  const outputData = state.outputData;

  const test = `
  const supertest = require('supertest');
  const app = require('${serverApp}'); 
  const request = supertest(app);
  jest.useFakeTimers();  
  
  test('${expectedRes}', async (done) => {
    const response = await request
    .${methodSelect}('${desiredEndpoint}')
    ${inputData}
    ${headerInfo}
  expect(${inputData}).toBe(${outputData});
  return done();
  });
`;

  return test;
};

export default RestTestCreation;
