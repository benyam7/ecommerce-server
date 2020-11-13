const { gql } = require('apollo-server');

module.exports = gql`
  # mutations
  # queries
  # custom types
  type Item {
    name: String!
    price: Float!
    photoUrl: String!
    description: String
    seller: User!
  }
  # results
`;
