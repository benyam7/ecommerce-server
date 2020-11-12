const { ApolloServer } = require('apollo-server');

const { gql } = require('apollo-server');

const schema = gql`
  type Query {
    test: String
  }
`;

const resolvers = {
  Query: {
    async test(parent, args, context) {
      return 'working';
    },
  },
};
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.listen({ port: 5000 });
