import { ApolloServer, gql } from 'apollo-server';
// import { typeDefs } from './schema'

const typeDefs = gql`
  type Query {
    greeting: String
  }
`;

const resolvers = {
  Query: {
    greeting: () => 'Hello GraphQL world!👋',
  },
};


const server = new ApolloServer({
    typeDefs,
    resolvers

})


server.listen().then(({ url }) => {
    console.log(`Server ready on ${url}`)
})