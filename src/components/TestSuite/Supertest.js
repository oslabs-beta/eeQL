import React, { useContext } from 'react';
const request = require ("supertest");
const fs = require('fs');
const path = require('path');
// const app = require('app');
import { app } from './server/index.js'
import Test from 'Test.tsx';


const test = './db/markets.js'

//POST request test 
   //describe syntax
   describe( `POST ${test}`, ()=>{
     //it syntax
     it (`${state.expectedRes}`, (done) => {
        //request
        request(app)
         //post method
         .post(`${test}`)
         //send  method
         .send(`value is equivalent to ${outputDropdown.selectedIndex.text}`)
         //expect method
         .expect(res.status).to.be.equal(200)
         //done method
         .done()
     })
   })
      
//GET request test 
  //describe syntax
  describe(` GET ${test} `, () => {
    //it syntax
    it (`${state.expectedRes}`, (done) => {
      request(app)
      //get method
      .get(`${test}`)
      //set method
      .set({
        Accept: 'application/json'
      })
      //expect method
      .expect({
        'Content-Type' : 'json'
      })
      //done method
      .done()
    })

  })

export default TestSuite;