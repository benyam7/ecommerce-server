require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

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

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
    });
    server.listen({ port: 5000 });
    console.log('connected to db');
  } catch (err) {
    console.log('Failed to connect to DB', err);
  }
};

connect();
mongoose.set('debug', true);
