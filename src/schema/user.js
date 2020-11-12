const { gql } = require('apollo-server');

module.exports = gql`
  # mutations

  # queries

  # types
  type User {
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    password: String!
    confirmPassword: String!
  }

  extend type Query {
    test: String
  }
  # custom types
`;
