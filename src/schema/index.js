const { gql } = require('apollo-server');
const userSchema = require('./user.js');
const errorsSchema = require('./errors.js');
const stitchSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [stitchSchema, userSchema, errorsSchema];
