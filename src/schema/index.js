const { gql } = require('apollo-server');
const userSchema = require('./user.js');

const stitchSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [stitchSchema, userSchema];
