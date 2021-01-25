const { ApolloServer } = require('apollo-server');

// Define types
const typeDefs = `
  type Query {
    info: String!
  }
`

// Define resolvers
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}

// Define server
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );