const graphQLTestCreation = (state) => {


const addMutationObject = (state.operationIsMutation !== false) ? "" : `, ${state.mutationObject}`;

const egqlBoilerplate = (state) => 
`
'use strict'

const fs = require('fs')
const path = require('path')
const EasyGraphQLTester = require('easygraphql-tester')

const schema = fs.readFileSync(path.join(__dirname, "${state.schemaFile}"), 'utf8')
const resolvers = require("${state.resolverFile}")

describe('Test queries and mutations', () => {
  let tester

  beforeEach(() => {
    tester = new EasyGraphQLTester(schema, resolvers)
  })
  describe('${state.expectedRes}', () => {
`

const queryValidQueryBoilerPlate = (state) => 
`
    it('${state.expectedRes}', () => {
      const operation = \`${state.gqlOperationText}\`
      tester.test(${state.operationIsValid}, operation${addMutationObject})
    })
`

const closingParens = `
  })
})
`

return egqlBoilerplate(state) + queryValidQueryBoilerPlate(state) + closingParens;
};

export default graphQLTestCreation;
