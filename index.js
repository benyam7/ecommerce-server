require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const schema = require('./src/schema');
const resolvers = require('./src/resolvers');

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
