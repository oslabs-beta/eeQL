const graphQLTestCreation = (state) => {


  const addMutationObject = (state.operationIsMutation !== true) ? `, ${state.mutationObject}` : "";
//   if (state.operationIsMutation) {
//     gqlOperationText += `, {
//       ${state.mutationObject}
//     }`
//   }
  
//   = (!state.operationIsQuery) ? 
// ? `.send(${state.inputData});`
// : "";

// const isQueryValid = state.queryValidity ? true : false;

// const mutationObject = {};

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
      tester.test(${state.validOrInvalid}, operation${addMutationObject})
    })
`

const closingParens = `
  })
})
`


//     it('${insertTestDescriptionHere}', () => {
//       const validQuery = `
//         {
//           getMeByTestResult(result: 4.9) {
//             email
//           }
//         }
//       `
//       tester.test(true, validQuery)
//     })

//     it('Should pass if the mutation is valid', () => {
//       const mutation = `
//         mutation UpdateUserScores($scores: ScoresInput!) {
//           updateUserScores(scores: $scores) {
//             email
//             scores
//           }
//         }
//       `
//       tester.test(true, mutation, {
//         scores: {
//           scores: [1, 2, 3]
//         }
//       })
//     })
// //   })
// // })


return egqlBoilerplate(state) + queryValidQueryBoilerPlate(state) + closingParens;
};

export default graphQLTestCreation;
