const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  extend type Mutation {
    addItemsToCart(
      items: [CartItemInput!]!
      cartId: ID
    ): AddItemsToCartResult!
    removeItemFromCart(itemId: ID!): RemoveItemFromCartResult!
    editItemQuantityInCart(
      itemId: ID!
      cartId: ID!
      quantity: Int!
    ): EditItemQuantityInCartResult!
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
    cartId: String!
  }

  type RemoveItemFromCartSuccess {
    message: String!
  }

  type EditItemQuantityInCartSuccess {
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

  union EditItemQuantityInCartResult =
      EditItemQuantityInCartSuccess
    | NotAuthenticatedUserError
    | EditItemQuantityInCartError
    | EditItemQuantityInCartInputError
`;
