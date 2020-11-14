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
  extend type Query {
    item(itemId: ID!): ItemResult!
    items(
      cursor: String
      limit: Int
      ascending: Boolean!
    ): ItemsResult!
  }
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
    createdAt: String
  }

  type Vendor {
    firstName: String!
    lastName: String!
    email: String!
  }

  type DeletionSuccess {
    message: String!
  }

  type Items {
    items: [Item!]
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
    | ItemInputErrors

  union ItemResult =
      Item
    | NotAuthenticatedUserError
    | ItemDoesntExistError
    | GetItemError

  union ItemsResult =
      Items
    | NotAuthenticatedUserError
    | GetItemsError
`;
