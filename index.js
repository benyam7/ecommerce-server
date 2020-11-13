require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const schema = require('./src/schema');
const resolvers = require('./src/resolvers');
const models = require('./src/models');

const secret = process.env.SECRET;
const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    secret,
  },
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN, {
      useNewUrlParser: true,
    });
    server.listen({ port: PORT });
    console.log('connected to db');
  } catch (err) {
    console.log('Failed to connect to DB', err);
  }
};

connect();
mongoose.set('debug', true);
