import React, {useContext} from "react";
// import GraphQL from "graphql";
// @ts-ignore
import { ApolloClient, InMemoryCache, ApolloProvider, HTTPLink, gql, from } from "@apollo/client/core";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";


const GraphQl = () => {
    const { test, testHandler, resetHandler }: any = useContext(TestContext);
    return (
        <div>GraphQL</div>
    )
}

export default GraphQl


//InMemoryCache normalizes query response objects before it saves them to its internal data store
//InMemoryCache generates a unique identifier for any object that includes a __typename field


// export const client = new ApolloClient({
// URI: 'http://localhost:8080',
// cache: new InMemoryCache(),
// onError: (e)=> {console.log('The error is :', e)}
// })

// //TEST
// describe(`${test}`, ()=>{
// it($`{test.expectedRes}`, async()=>{
// // create a  GraphQLSchema instance using the function makeExecutableSchema

// //assign variable to the value of reading schema using fs.readFileSync
// const readSchema = fs.readFileSync('users graphql schema', utf8)
// //assign variable to the value of the schema and resolvers  combined using makeExecutableSchema
// const finalSchema = makeExecutableSchema({readSchema, resolvers})
// //   await 
// })

// )


// })