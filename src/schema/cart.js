const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  extend type Mutation {
    addItemsToCart(items: [CartItemInput!]!): AddItemsToCartResult!
    removeItemFromCart(itemId: ID!): RemoveItemFromCartResult!
  }

  #queries

  # custom types
  type Cart {
    id: ID!
    items: [CartItem!]
    buyer: Buyer!
  }

  type CartItem {
    item: Item!
    quantity: Int!
  }

  type Buyer {
    firstName: String!
    lastName: String!
    email: String!
  }

  type CartAdditionSuccess {
    message: String!
  }

  type RemoveItemFromCartSuccess {
    message: String!
  }
  # inputs

  input CartItemInput {
    item: String!
    quantity: Int!
  }

  #results
  union AddItemsToCartResult =
      CartAdditionSuccess
    | NotAuthenticatedUserError
    | AddItemsToCartError

  union RemoveItemFromCartResult =
      NotAuthenticatedUserError
    | RemoveItemFromCartError
    | RemoveItemFromCartSuccess
`;
