import React, {useContext} from "react";
// import GraphQL from "graphql";
import {ApolloClient, InMemoryCache, ApolloProvider, HTTPLink, from} from "@apollo/client/core";
import { TestContext } from "../../../provider/TestProvider";
import { StateContext } from "../../../provider/StateProvider";

//InMemoryCache normalizes query response objects before it saves them to its internal data store
//InMemoryCache generates a unique identifier for any object that includes a __typename field
const cache = new InMemoryCache()

export const client = new ApolloClient({
URI: 'http://localhost:8080'
onError: (e)=> {console.log('')}
})

