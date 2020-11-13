const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  extend type Mutation {
    register(userInput: UserInput!): RegisterResult!
    login(email: String!, password: String!): LoginResult!
  }
  # queries

  # types
  type User {
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    password: String!
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

  union LoginResult = Token | UserInputError | LogInError | TokenError
`;
