const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  extend type Mutation {
    addItem(newItem: ItemInput!): AddItemResult!
    deleteItem(itemId: ID!): DeleteItemResult!
    editItem(
      updateItem: UpdateItemInput!
      itemId: ID!
    ): EditItemResult!
  }
  # queries
  #   inputs
  input ItemInput {
    name: String!
    price: Float!
    photoUrl: String!
    description: String!
  }
  input UpdateItemInput {
    name: String
    price: Float
    photoUrl: String
    description: String
  }
  # custom types
  type Item {
    id: ID!
    name: String!
    price: Float!
    photoUrl: String!
    description: String
    vendor: Vendor!
  }

  type Vendor {
    firstName: String!
    lastName: String!
    email: String!
  }

  type DeletionSuccess {
    message: String!
  }

  # results
  union AddItemResult =
      Item
    | AddItemError
    | ItemInputErrors
    | NotAuthenticatedUserError

  union DeleteItemResult =
      DeletionSuccess
    | DeleteItemError
    | NotAuthenticatedUserError
    | ItemNotOwnerError
    | ItemDoesntExistError

  union EditItemResult =
      Item
    | EditItemError
    | NotAuthenticatedUserError
    | ItemNotOwnerError
    | ItemDoesntExistError
`;
