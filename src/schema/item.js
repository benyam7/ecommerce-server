const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  extend type Mutation {
    addItem(newItem: ItemInput!): AddItemResult!
  }
  # queries
  #   inputs
  input ItemInput {
    name: String!
    price: Float!
    photoUrl: String!
    description: String!
  }
  # custom types
  type Item {
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
  # results
  union AddItemResult =
      Item
    | AddItemError
    | ItemInputErrors
    | NotAuthenticatedUserError
`;
