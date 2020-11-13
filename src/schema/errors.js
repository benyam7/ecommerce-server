const { gql } = require('apollo-server');

module.exports = gql`
  interface Error {
    message: String!
    type: String
  }
  #   user errors

  type UserInputError implements Error {
    message: String!
    type: String
    userInputErrors: UserInputErrors!
    valid: Boolean!
  }

  type TokenError implements Error {
    message: String!
    type: String
  }

  type RegisterError implements Error {
    message: String!
    type: String
  }

  type UserInputErrors {
    email: String
    password: String
    firstName: String
    lastName: String
    confirmPassword: String
    role: String
  }
`;
