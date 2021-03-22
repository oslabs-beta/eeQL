import React, { useContext } from "react";
const request = require("supertest");
const fs = require("fs");
const path = require("path");
// const app = require('app');
import { TestContext } from "../../provider/TestProvider";
import { StateContext } from "../../provider/StateProvider";

const { test, monacoPoster } = useContext(TestContext);
const { activePort } = useContext(StateContext);
const db = "./db/markets.js";

// if element selected is strictly equal to POST, the post request test should run
if (test.methodSelect === "POST") {
  //POST request test
  //describe syntax
  describe(`${db}`, () => {
    //it syntax
    it(`${test.expectedRes}`, (done) => {
      //request
      request(activePort)
        //post method
        .post(test.serverApp)
        //send  method
        .send(`value is equivalent to ${outputDropdown.selectedIndex.text}`)
        //expect method
        .expect(res.status)
        .to.be.equal(200)
        //done method
        .done();
    });
  });
}

const str = `${test.expectedRes} `;
monacoPoster(str);
// console.log(str)

// if element selected is strictly equal to GET, the get request test should run
if (document.getElementById("methodSelect") === "GET") {
  //GET request test
  //describe syntax
  describe(`${db}`, () => {
    //it syntax
    it(`${test.expectedRes}`, (done) => {
      request(activePort)
        //get method
        .get(test.serverApp)
        //set method
        .set({
          Accept: "application/json",
        })
        //expect method
        .expect({
          "Content-Type": "json",
        })
        //done method
        .done();
    });
  });
}

// if element selected is strictly equal to PUT, the put request test should run
if (document.getElementById("methodSelect") === "PUT") {
  //PUT request test
  //describe syntax
  describe(`${db}`, () => {
    //it syntax
    it(`${test.expectedRes}`, (done) => {
      request(activePort)
        //get method
        .put(test.serverApp)
        //set method
        .set({
          Accept: "application/json",
        })
        //expect method
        .expect({
          "Content-Type": "json",
        })
        //done method
        .done();
    });
  });
}

// if element selected is strictly equal to DELETE, the delete request test should run
if (document.getElementById("methodSelect") === "DELETE") {
  //DELETE request test
  describe(`${db}`, () => {
    //it syntax
    it(`${test.expectedRes}`, (done) => {
      request(activePort)
        //get method
        .delete(test.serverApp)
        //set method
        .set({
          Accept: "application/json",
        })
        //expect method
        .expect({
          "Content-Type": "json",
        })
        //done method
        .done();
    });
  });
}

export default TestSuite;
