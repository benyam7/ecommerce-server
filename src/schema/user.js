const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  extend type Mutation {
    register(userInput: UserInput): String
  }
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

  # custom types
  type Token {
    token: String!
  }

  #   inputs
  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    password: String!
    confirmPassword: String!
  }
`;
