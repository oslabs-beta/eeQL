
'use strict'

const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('easygraphql-tester')

const schema = fs.readFileSync(path.join(__dirname, "undefined"), 'utf8')
const resolvers = require("undefined")

describe('Test queries and mutations', () => {
  let tester

  beforeEach(() => {
    tester = new EasyGraphQLTester(schema, resolvers)
  })
  describe('graphql', () => {

    it('graphql', () => {
      const operation = `user: "people'`
      tester.test(false, operation)
    })

  })
})
