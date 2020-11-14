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

  type LogInError implements Error {
    message: String!
    type: String
  }

  type NotAuthenticatedUserError implements Error {
    message: String!
    type: String
  }

  #item errors
  type ItemInputErrors implements Error {
    message: String!
    type: String
    itemError: ItemError
  }

  type ItemError {
    name: String
    price: String
    photoUrl: String
    description: String
  }

  type AddItemError implements Error {
    message: String!
    type: String
  }

  type ItemNotOwnerError implements Error {
    message: String!
    type: String
  }

  type DeleteItemError implements Error {
    message: String!
    type: String
  }
  type ItemDoesntExistError implements Error {
    message: String!
    type: String
  }

  type EditItemError implements Error {
    message: String!
    type: String
  }

  type GetItemError implements Error {
    message: String!
    type: String
  }

  type GetItemsError implements Error {
    message: String!
    type: String
  }

  #cart errors
  type AddItemsToCartError implements Error {
    message: String!
    type: String
  }
  type RemoveItemFromCartError implements Error {
    message: String!
    type: String
  }

  type EditItemQuantityInCartError implements Error {
    message: String!
    type: String
  }

  type EditItemQuantityInCartInputError implements Error {
    message: String!
    type: String
    valid: Boolean!
    quantity: String!
  }
`;
