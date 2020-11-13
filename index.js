require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const schema = require('./src/schema');
const resolvers = require('./src/resolvers');
const models = require('./src/models');

const secret = process.env.SECRET;
const PORT = process.env.PORT || 5000;

// get current user
const getCurrentUser = async (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];

    if (token) {
      try {
        const user = await jwt.verify(token, secret);
        return user;
      } catch (e) {
        return null;
      }
    }
    // if token is not in right format
    throw new Error("Token is not in a format 'Bearer token' ");
  }
};
// setup server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const currentUser = await getCurrentUser(req);

      return { models, currentUser, secret };
    }
  },
});

// connect to db
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
