const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  extend type Mutation {
    register(userInput: UserInput): RegisterResult!
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

  #   inputs
  input UserInput {
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

  # results
  union RegisterResult =
      Token
    | UserInputError
    | TokenError
    | RegisterError
`;
